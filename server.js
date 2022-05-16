const express = require("express");
const res = require("express/lib/response");
const mysql = require("mysql2");
//const cTable = require("console.table");
const inquirer = require("inquirer");
const sequelize = require("./config/connection");

const deptQuery = require("./queries/deptQuery");
const roleQuery = require("./queries/roleQuery");
const empQuery = require("./queries/empQuery");

const deptArray = ['a', 'b', 'c', 'd']
//const Dept = require("./models/Dept");
//const { parse } = require("dotenv");
//const { json } = require("express/lib/response");

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
);






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
          questionnaire();
          break;
        case "ADD_ROLE":
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
        case "QUIT":
          deptQuery.deptList();
          console.log(deptArray);
          break;
      }
    })
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
      db.execute(`INSERT INTO department (name, salary) VALUES ('${deptData.department_name}');`);

      questionnaire();
    })
}

function addRole() {

  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the new position?",
        name: "role_name",
      },
      {
        type: "number",
        message: "WHat is the salary for this position?",
        name: "role_salary",
      },
      {
        type: "list",
        message: "What department is this position in?",
        name: "role_dept",
        choices: deptArray,
      },
    ])
    .then((roleData) => {
      //db.execute(`INSERT INTO role (title, salary, department_id) VALUES ('${roleData.role_name}', '${roleData.role_salary}', '${roleData.dept}');`);
      console.log(roleData);
      questionnaire();
    })
}



sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"), questionnaire());
});

module.exports = { questionnaire }