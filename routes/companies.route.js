const express = require("express");
const router = express.Router();
const {
  getAllCompanies,
  getOneCompany
} = require("../controllers/company.controller");

router.get("/", getAllCompanies);

router.get("/:companyId", getOneCompany);

const reviewsRouter = require("./reviews.route");
router.use("/:companyId/reviews", reviewsRouter);

module.exports = router;
