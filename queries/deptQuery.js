const mysql = require("mysql2");
//const Dept = require("../models/Dept");
const inquirer = require("inquirer");
const server = require("../server");

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

function callDepts() {
  db.execute(`SELECT * FROM department`, function (err, results) {
    if (err) {
      console.error(err);
    }
    console.table(results);
  });
}

function deptList () {
  db.execute(`SELECT name FROM department`, function (err, results) {
    if (err) {
      console.error(err);
    }
    
    console.log(Object.values(results));
    
  });
}


module.exports = { callDepts, deptList };
