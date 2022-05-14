const express = require("express");
const res = require("express/lib/response");
const mysql = require("mysql2");
const cTable = require("console.table");
const inquirer = require("inquirer");
const sequelize = require("./config/connection");

//const deptQuery = require("./Queries/deptQuery")

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

function questionnaire() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would like to do today?",
        name: "directory",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add A Department",
          "Add a Role",
          "Add An Employee",
          "Update An Employee Role",
          "Quit",
        ],
      },
    ])
    .then((data) => {
      switch (data.directory) {
        case "View All Departments":
          console.log("logged!");
          //const table = cTable.getTable(rows);
        
          function callDepts() {
              sequelize.query(`SELECT * FROM department;`, (err, results) => {
                if (err) throw err;
                console.table(results); 
              });
          }
          
          callDepts();

          break;
        case "View All Roles":
          console.log("A");
          break;
        case "View All Employees":
          console.log("A");
          break;
        case "Add A Department":
          console.log("A");
          break;
        case "Add a Role":
          console.log("A");
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

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"), questionnaire());
});
