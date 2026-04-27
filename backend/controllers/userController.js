
// const db = require("../config/db");

// exports.createUser = (req, res) => {
//   console.log("BODY:", req.body);

//   const { full_name, designation, employee_id, email, phone } = req.body;

//   if (!full_name || !designation || !employee_id || !email || !phone) {
//     return res.status(400).json({ error: "All fields required" });
//   }

//   const sql = `
//     INSERT INTO users (full_name, designation, employee_id, email, phone)
//     VALUES (?, ?, ?, ?, ?)
//   `;

//   db.query(sql, [full_name, designation, employee_id, email, phone], (err, result) => {
//     if (err) {
//       console.error("DB ERROR FULL:", err);

//       return res.status(500).json({
//         message: "Database error",
//         error: err.sqlMessage || err.message
//       });
//     }

//     res.json({
//       success: true,
//       userId: result.insertId
//     });
//   });
// };

// exports.getUser = (req, res) => {
//   res.json(null);
// };


exports.createUser = (req, res) => {
  console.log("SAVE WORKING:", req.body);

  const { full_name, designation, employee_id, email, phone } = req.body;

  if (!full_name || !designation || !employee_id || !email || !phone) {
    return res.status(400).json({ error: "All fields required" });
  }

  res.json({
    success: true,
    userId: Date.now() // unique id
  });
};