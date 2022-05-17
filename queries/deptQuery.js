const mysql = require("mysql2");
const inquirer = require("inquirer");

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

fart = 3;

module.exports = { callDepts, };
