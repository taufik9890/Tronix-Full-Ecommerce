const secureApi = (req, res, next) => {
  if (req.headers.authorization === "abc") {
    next();
  } else {
    res.send({ error: "invalid sites" });
  }
};

module.exports = secureApi;
