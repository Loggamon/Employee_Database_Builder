// const router = require("express").Router();

// router.get("/employees", (req, res) => {
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

const mysql = require("mysql2");
const Role = require("../models/Role");

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

function callEmps() {
  db.execute(`SELECT employee.id as Employee_ID, employee.first_name as First_Name, employee.last_name as Last_Name, role.title as Job_Title, role.salary as Salary, employee.first_name as Manager FROM employee JOIN role ON employee.role_id = role.id`, function (err, results) {
    if (err) {
      console.error(err);
    }
    console.table(results);
  });
}

module.exports = { callEmps };

// module.exports = router;

// SELECT employee.id as Employee_ID, employee.first_name as First_Name, employee.last_name as Last_Name, role.title as Job_Title, role.salary as Salary, department.name as Dept, employee.first_name as Manager FROM employee JOIN role ON employee.role_id = role.id JOIN department ON employee.role_id = department.id JOIN employee ON employee.manager_id = employee_id

// SELECT employee.id as Employee_ID, employee.first_name as First_Name, employee.last_name as Last_Name, role.title as Job_Title, role.salary as Salary, employee.first_name as Manager FROM employee JOIN role ON employee.role_id = role.id
// SELECT employee.id as Employee_ID, employee.first_name as First_Name, employee.last_name as Last_Name, role.title as Job_Title, role.salary as Salary, employee.id as Manager FROM employee INNER JOIN employee ON employee.id = employee.manager_id JOIN role ON employee.role_id = role.id
