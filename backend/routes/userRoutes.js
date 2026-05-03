// const router = require("express").Router();
// const ctrl = require("../controllers/userController");

// // Create user
// router.post("/", async (req, res) => {
//   try {
//     await ctrl.createUser(req, res);
//   } catch (err) {
//     console.error("ROUTE ERROR:", err);
//     res.status(500).json({ error: "Route failed" });
//   }
// });

// // Get user
// router.get("/", async (req, res) => {
//   try {
//     await ctrl.getUser(req, res);
//   } catch (err) {
//     console.error("ROUTE ERROR:", err);
//     res.status(500).json({ error: "Route failed" });
//   }
// });

// module.exports = router;

const router = require("express").Router();
const ctrl = require("../controllers/userController");

router.post("/", ctrl.createUser);
router.get("/", ctrl.getUser);

module.exports = router;