const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json("Checking Lagrima");
});

module.exports = router;
