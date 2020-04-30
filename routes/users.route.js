const express = require("express");
const router = express.Router();

router.get("", (req, res, next) => {
  try {
    res.send("Welcome to users homepage");
  } catch (err) {
    next(err);
  }
});

router.post("/register", (req, res, next) => {
  try {
    res.send("register route");
  } catch (err) {
    next(err);
  }
});

router.post("/login", (req, res, next) => {
  try {
    res.send("login route");
  } catch (err) {
    next(err);
  }
});

router.post("/logout", (req, res, next) => {
  try {
    res.send("logout route");
  } catch (err) {
    next(err);
  }
});

const reviewsRouter = require("./reviews.route");
router.use("/reviews", reviewsRouter);

module.exports = router;
