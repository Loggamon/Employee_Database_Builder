const express = require("express");
const res = require("express/lib/response");
const mysql = require("mysql2");
const cTable = require("console.table");
const inquirer = require("inquirer");
const sequelize = require("./config/connection");

const deptQuery = require("./queries/deptQuery");
//const deptQuery = require("./queries/roleQuery");
//const deptQuery = require("./queries/empQuery");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // TODO: Add MySQL password here
    password: "L30nK3nn3dy!",
    database: "company_db",
  },
  console.log(`Connected to the company_db database.`)
);

// app.get("/departments", (req, res) => {
//   const sql = `SELECT * FROM department`;
//   db.query(sql, (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: "success",
//       data: rows,
//     });
//     console.table(rows);
//   });
// });

// function callDepts() {
//   app.get("/departments", (req, res) => {
//     const sql = `SELECT * FROM department`;
//     db.query(sql, (err, rows) => {
//       if (err) {
//         res.status(500).json({ error: err.message });
//         return;
//       }
//       res.json({
//         message: "success",
//         data: rows,
//       });
//       console.table(rows);
//     });
//   });
// }

// app.get("/roles", (req, res) => {
//   const sql = `SELECT role.title, role.id, role.salary FROM role`;
//   db.query(sql, (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: "success",
//       data: rows,
//     });
//     console.table(rows);
//   });
// });

// app.get("/employees", (req, res) => {
//   const sql = `SELECT employee.id as Employee_ID, employee.first_name as First_Name, employee.last_name as Last_Name, role.title as Job_Title, role.salary as Salary, employee.first_name as Manager FROM employee JOIN role ON employee.role_id = role.id`;
//   db.query(sql, (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: "success",
//       data: rows,
//     });
//     console.table(rows);
//   });
// });

function questionnaire() {
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
            value: "ADD_EMPLOYEES",
          },
          {
            name: "Add An Employee",
            value: "ADD_EMPLOYEES",
          },
          {
            name: "Update An Employee Role",
            value: "UPDATE_EMPLOYEES",
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
          break;
        case "View All Roles":
          console.log("A");
          break;
        case "View All Employees":
          console.log("A");
          break;
        case "Add A Department":
          console.log("A");
          addDept();
          break;
        case "Add a Role":
          console.log("A");
          addRole();
          break;
        case "Add An Employee":
          console.log("A");

          break;
        case "Update An Employee Role":
          console.log("A");
          break;
        case "View All Departments":
          console.log("A");
          break;
        case "Quit":
          break;
      }
    });
}

function addDept() {
  inquirer.prompt([
    {
      type: "input",
      message: "WHat is the name of the new department?",
      name: "department_name",
    },
  ]);
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "WHat is the name of the new position?",
        name: "role_name",
      },
      {
        type: "number",
        message: "WHat is the salary for this position?",
        name: "role_salary",
      },
      {
        type: "input",
        message: "What department is this position in?",
        name: "role-dept",
      },
    ])
    .then((data) => {
      switch (data.role - dept) {
        case "View All Departments":
          break;
        case "View All Roles":
          console.log("A");
          break;
        case "View All Employees":
          console.log("A");
          break;
      }
    });
}

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"), questionnaire());
});
