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

function callRoles() {
  db.execute(`SELECT role.title as Job_Title, role.id as Role_ID, department.name as Department_Name, role.salary as Salary FROM role JOIN department ON role.department_id = department.id`, function (err, results) {
    if (err) {
      console.error(err);
    }
    console.table(results);
  });
}

module.exports = { callRoles };


// router.get("/all", (req, res) => {
//   const sql = `SELECT role.title as Job_Title, role.id as Role_ID, department.name as Department_Name, role.salary as Salary FROM role JOIN department ON role.department_id = department.id`;
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

// module.exports = router;
