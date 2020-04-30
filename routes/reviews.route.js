const express = require("express");
const router = express.Router();

router.post("", (req, res)=> {
  res.send("Welcome to review route");
});

module.exports = router;
