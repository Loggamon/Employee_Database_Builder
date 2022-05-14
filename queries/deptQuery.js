const mysql = require("mysql2");
const Dept = require("../models/Dept");

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

// function deptQuery() {
//   const sql = `SELECT * FROM department`;
//   const deptData = await db.query(sql, (err, rows) => {
//     if (err) {
//       console.log
//     }
//     json(rows);
//     console.table(res);
//   });
// }

// db.execute(`SELECT * FROM department`, function(err, results) {
//   if (err) {
//     console.error(err);
//   }
//   console.table(results);
// });

function callDepts() {
  db.execute(`SELECT * FROM department`, function (err, results) {
    if (err) {
      console.error(err);
    }
    console.table(results);
  });
}

module.exports = { callDepts };
