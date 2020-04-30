const express = require("express");
const router = express.Router();
const {
  getAllCompanies,
} = require("../controllers/company.controller");

router.get("/", getAllCompanies);

router.get("/:companyId", (req, res, next) => {
  try {
    res.send(req.params.companyId);
  } catch (err) {
    next(err);
  }
});

const reviewsRouter = require("./reviews.route");
router.use("/:companyId/reviews", reviewsRouter);

module.exports = router;
