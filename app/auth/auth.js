const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.send({ status: false, msg: "Authorization Denied." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.id;
    next();
  } catch (error) {
    res.send({ status: false, msg: "Token is not valid" });
  }
};
