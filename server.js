require("dotenv").config();
const express = require("express");
const res = require("express/lib/response");
const mysql = require("mysql2");

const inquirer = require("inquirer");
const sequelize = require("./config/connection");

const deptQuery = require("./queries/deptQuery");
const roleQuery = require("./queries/roleQuery");
const empQuery = require("./queries/empQuery");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const db = mysql.createConnection({
  host: "localhost",
  user: "Your Username Here",
  password: "Your Password Here",
  database: "company_db",
});

console.clear();

function questionnaire() {
  console.clear();

  inquirer
    .prompt([
      {
        type: "list",
        message: "What would like to do today?",
        name: "directory",
        choices: [
          {
            name: "View All Departments",
            value: "VIEW_DEPTS",
          },
          {
            name: "View All Roles",
            value: "VIEW_ROLES",
          },
          {
            name: "View All Employees",
            value: "VIEW_EMPLOYEES",
          },
          {
            name: "Add A Department",
            value: "ADD_DEPT",
          },
          {
            name: "Add a Role",
            value: "ADD_ROLE",
          },
          {
            name: "Add An Employee",
            value: "ADD_EMPLOYEES",
          },
          {
            name: "Update An Employee Role",
            value: "UPDATE_EMPLOYEE",
          },
          {
            name: "Quit",
            value: "QUIT",
          },
        ],
      },
    ])
    .then((data) => {
      switch (data.directory) {
        case "VIEW_DEPTS":
          deptQuery.callDepts();
          questionnaire();
          break;
        case "VIEW_ROLES":
          roleQuery.callRoles();
          questionnaire();
          break;
        case "VIEW_EMPLOYEES":
          empQuery.callEmps();
          questionnaire();
          break;
        case "ADD_DEPT":
          addDept();
          break;
        case "ADD_ROLE":
          addRole();
          break;
        case "ADD_EMPLOYEES":
          addEmployee();
          break;
        case "UPDATE_EMPLOYEE":
          updateEmp();
          break;
        case "QUIT":
          console.clear();
          break;
      }
    });
}

function addDept() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the new department?",
        name: "department_name",
      },
    ])
    .then((deptData) => {
      const answers = [deptData.department_name];
      db.execute(
        `INSERT INTO department (name) VALUES ( ? );`,
        answers,
        (err, results) => {
          if (err) {
            console.error(err);
          }
        }
      );
      questionnaire();
    });
}

function addRole() {
  db.execute(`SELECT name, id FROM department`, function (err, results) {
    if (err) {
      console.error(err);
    }

    const rawList = Object.values(results);
    const newList = rawList.map(({ name, id }) => ({ name: name, value: id }));

    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the name of the new position?",
          name: "role_name",
        },
        {
          type: "number",
          message: "What is the salary for this position?",
          name: "role_salary",
        },
        {
          type: "list",
          message: "What department is this position in?",
          name: "role_dept",
          choices: newList,
        },
      ])
      .then((roleData) => {
        const answers = [
          roleData.role_name,
          roleData.role_salary,
          roleData.role_dept,
        ];

        db.execute(
          `INSERT INTO role (title, salary, department_id) VALUES ( ?, ?, ? );`,
          answers,
          (err, results) => {
            if (err) {
              console.error(err);
            }
          }
        );
        questionnaire();
      });
  });
}

function addEmployee() {
  db.execute(`SELECT title, id FROM role`, function (err, roleResults) {
    if (err) {
      console.error(err);
    }

    const rawList = Object.values(roleResults);
    const roleList = rawList.map(({ title, id }) => ({
      name: title,
      value: id,
    }));

    db.execute(
      `SELECT CONCAT (first_name, " ", last_name) AS name, id FROM employee`,
      function (err, managerResults) {
        if (err) {
          console.error(err);
        }

        const rawList = Object.values(managerResults);
        const managerList = rawList.map(({ name, id }) => ({
          name: name,
          value: id,
        }));

        inquirer
          .prompt([
            {
              type: "input",
              message: "What is the first name of the employee?",
              name: "emp_fname",
            },
            {
              type: "input",
              message: "What is their last name?",
              name: "emp_lname",
            },
            {
              type: "list",
              message: "What role does this employee have?",
              name: "emp_role",
              choices: roleList,
            },
            {
              type: "list",
              message: "Who is their boss?",
              name: "emp_manager",
              choices: managerList,
            },
          ])
          .then((empData) => {
            const answers = [
              empData.emp_fname,
              empData.emp_lname,
              empData.emp_role,
              empData.emp_manager,
            ];

            db.execute(
              `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ( ?, ?, ?, ? );`,
              answers,
              (err, results) => {
                if (err) {
                  console.error(err);
                }
              }
            );
            questionnaire();
          });
      }
    );
  });
}

function updateEmp() {
  db.execute(`SELECT CONCAT (first_name, " ", last_name) AS name, id FROM employee WHERE manager_id IS NOT NULL;`, function (err, empResults) {
    if (err) {
      console.error(err);
    }

    const rawList = Object.values(empResults);
    const empList = rawList.map(({ name, id }) => ({
      name: name,
      value: id,
    }));

    db.execute(`SELECT role.title AS title, role.id AS id FROM role;`, function (err, roleResults) {
      if (err) {
        console.error(err);
      }
  
      const rawList = Object.values(roleResults);
      const roleList = rawList.map(({title, id }) => ({
        name: title,
        value: id,
      }));
      
      inquirer
        .prompt([
          {
            type: "list",
            message: "Which employee would you like to update?",
            name: "emp_name",
            choices: empList,
          },
          {
            type: "list",
            message: "Which role will they work?",
            name: "new_role",
            choices: roleList,
          },
        ])
        .then((updateData) => {
          const answers = [
            updateData.new_role,
            updateData.emp_name,
          ];


          db.execute(
            `UPDATE employee SET role_id = ? WHERE id = ?;`,
            answers,
            (err, results) => {
              if (err) {
                console.error(err);
              }
            }
          );
          questionnaire();
        });
      }
    );
  });
}

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"), questionnaire());
});
