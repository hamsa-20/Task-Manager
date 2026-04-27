const db = require("../config/db");

exports.createUser = (data, callback) => {
  db.query("INSERT INTO users SET ?", data, callback);
};

exports.getUserById = (id, callback) => {
  db.query("SELECT * FROM users WHERE id=?", [id], callback);
};