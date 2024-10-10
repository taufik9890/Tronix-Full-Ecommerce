const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.headers.token;
  try {
    if (!token) {
      return res.send({ error: "Token is required" });
    } else {
      jwt.verify(token, process.env.LOGIN_TOKEN, function (err, decoded) {
        if (decoded) {
          next();
        } else {
          res.send({ error: "Valid token require" });
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = verifyToken;
