// const db = require("../config/db");

// exports.createUser = (req, res) => {
//   const data = req.body;

//   db.query("INSERT INTO users SET ?", data, (err, result) => {
//     if (err) return res.status(500).send(err);

//     req.session.userId = result.insertId;

//     res.send({ success: true });
//   });
// };

// exports.getUser = (req, res) => {

//   if (!req.session.userId) {
//     return res.send(null);
//   }

//   db.query(
//     "SELECT * FROM users WHERE id=?",
//     [req.session.userId],
//     (err, result) => {
//       if (err) return res.status(500).send(err);

//       res.send(result[0]);
//     }
//   );
// };


const db = require("../config/db");

exports.createUser = (req, res) => {
  console.log("BODY:", req.body);

  const { full_name, designation, employee_id, email, phone } = req.body;

  if (!full_name || !designation || !employee_id || !email || !phone) {
    return res.status(400).json({ error: "All fields required" });
  }

  const sql = `
    INSERT INTO users (full_name, designation, employee_id, email, phone)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [full_name, designation, employee_id, email, phone], (err, result) => {
    if (err) {
      console.error("DB ERROR FULL:", err);

      // 👇 IMPORTANT: return readable error
      return res.status(500).json({
        message: "Database error",
        error: err.sqlMessage || err.message
      });
    }

    res.json({
      success: true,
      userId: result.insertId
    });
  });
};

exports.getUser = (req, res) => {
  res.json(null);
};