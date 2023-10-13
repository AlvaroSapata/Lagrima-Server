const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json("Checking Lagrima orders route");
});

module.exports = router;
