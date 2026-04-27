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
  console.log("BODY:", req.body); // 👈 ADD THIS

  const { full_name, designation, employee_id, email, phone } = req.body;

  if (!full_name || !designation || !employee_id || !email || !phone) {
    console.log("Missing fields ❌");
    return res.status(400).send({ error: "All fields required" });
  }

  db.query(
    "INSERT INTO users (full_name, designation, employee_id, email, phone) VALUES (?, ?, ?, ?, ?)",
    [full_name, designation, employee_id, email, phone],
    (err, result) => {
      if (err) {
        console.error("DB ERROR:", err); // 👈 ADD THIS
        return res.status(500).send(err);
      }

      res.send({
        success: true,
        userId: result.insertId
      });
    }
  );
};

exports.getUser = (req, res) => {

  res.send(null);
};