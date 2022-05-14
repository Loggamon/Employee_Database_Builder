const router = require("express").Router();
const deptQuery = require("./deptQuery");
const roleQuery = require("./roleQuery");

router.use("/departments", deptQuery);
router.use("/roles", roleQuery);

module.exports = router;
