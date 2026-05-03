const router = require("express").Router();
const ctrl = require("../controllers/taskController");
const { checkSession } = require("../middleware/authMiddleware");

router.get("/", checkSession, ctrl.getTasks);
router.post("/", checkSession, ctrl.createTask);
router.post("/manual", checkSession, ctrl.manualTask);
router.post("/start/:id", checkSession, ctrl.startTask);
router.post("/pause/:id", checkSession, ctrl.pauseTask);
router.post("/resume/:id", checkSession, ctrl.resumeTask);
router.post("/stop/:id", checkSession, ctrl.stopTask);
router.put("/edit/:id", checkSession, ctrl.editTask);

module.exports = router;