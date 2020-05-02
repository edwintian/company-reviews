const express = require("express");
const router = express.Router();
const {protectRoute, requireJsonContent} = require("../utils/helper");
const {mergeUserInfoAndCreateReview} = require("../controllers/review.controller");

router.post("", protectRoute, requireJsonContent, mergeUserInfoAndCreateReview);

module.exports = router;
