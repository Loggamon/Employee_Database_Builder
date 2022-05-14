const router = require("express").Router();

router.get("/all", (req, res) => {
  const sql = `SELECT role.title as Job_Title, role.id as Role_ID, department.name as Department_Name, role.salary as Salary FROM role JOIN department ON role.department_id = department.id`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
    console.table(rows);
  });
});

module.exports = router;
