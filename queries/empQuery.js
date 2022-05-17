const mysql = require("mysql2");


const db = mysql.createConnection(
  {
    host: "localhost",
    
    user: "root",
    
    password: "L30nK3nn3dy!",
    database: "company_db",
  },
);

function callEmps() {
  db.execute(`SELECT employee.id as Employee_ID, CONCAT (employee.first_name, " ", employee.last_name) as Name, role.title as Title, role.salary as Salary, department.name as Department, CONCAT (manager.first_name, " ", manager.last_name) as Manager FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id INNER JOIN employee AS manager ON employee.manager_id = manager.id;`, function (err, results) {
    if (err) {
      console.error(err);
    }
    console.log(' ');
    console.table(results);
    console.log(`
    
    
    
    
    
    
    `);
  });
}

module.exports = { callEmps };
