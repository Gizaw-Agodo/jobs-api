require("dotenv").config();
const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ err: "no token provided" });
  }
  try {
    const token = authHeader.split(" ")[1];
    const salt_string = process.env.salt_string;
    const decoded = jwt.verify(token, salt_string);
    req.user = { userId: decoded.id, name: decoded.name };
    next();
  } catch (error) {
    res.json({"error":error});
  }
};

module.exports = authenticateUser;
