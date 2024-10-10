const express = require("express");
const router = express.Router();
const api = require("./api");

router.use(process.env.API_URL, api);

module.exports = router;
