exports.checkSession = (req, res, next) => {
  const userId = req.headers.userid;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized: No user session found" });
  }

  req.userId = userId;
  next();
};