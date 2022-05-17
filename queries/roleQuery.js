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

function callRoles() {
  db.execute(`SELECT role.title as Job_Title, role.id as Role_ID, department.name as Department_Name, role.salary as Salary FROM role JOIN department ON role.department_id = department.id`, function (err, results) {
    if (err) {
      console.error(err);
    }
    console.table(results);
  });
}

module.exports = { callRoles };