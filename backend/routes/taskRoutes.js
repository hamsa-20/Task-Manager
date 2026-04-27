const router = require("express").Router();
const ctrl = require("../controllers/taskController");
const { checkSession } = require("../middleware/authMiddleware");

router.post("/", checkSession, ctrl.createTask);
router.get("/", checkSession, ctrl.getTasks);
router.post("/start/:id", checkSession, ctrl.startTask);
router.post("/pause/:id", checkSession, ctrl.pauseTask);
router.post("/resume/:id", checkSession, ctrl.resumeTask);
router.post("/stop/:id", checkSession, ctrl.stopTask);

module.exports = router;