const express = require("express");
const router = express.Router();
const {requireJsonContent, protectRoute} = require("../utils/helper");
const {
findUser,
validateAndCreateUser,
validateLoginAndCreateJWTCookie,
clearCookieAndDisplayLogoutMsg
} = require("../controllers/user.controller");

router.get("", protectRoute, findUser);

router.post("/register", requireJsonContent, validateAndCreateUser);

router.post("/login", requireJsonContent, validateLoginAndCreateJWTCookie);

router.post("/logout", requireJsonContent, clearCookieAndDisplayLogoutMsg);

const reviewsRouter = require("./reviews.route");
router.use("/reviews", reviewsRouter);

module.exports = router;
