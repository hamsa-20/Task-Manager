exports.createUser = (req, res) => {
  console.log("SAVE WORKING:", req.body);

  const { full_name, designation, employee_id, email, phone } = req.body;

  if (!full_name || !designation || !employee_id || !email || !phone) {
    return res.status(400).json({ error: "All fields required" });
  }

  const userId = Date.now();   // generate id

  req.session.userId = userId; 

  res.json({
    success: true,
    userId
  });
};