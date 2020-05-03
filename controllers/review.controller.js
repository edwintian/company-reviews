require("../utils/db");
const Company = require("../models/company.model");
const Joi = require("@hapi/joi");
const { v4: uuidv4 } = require("uuid");

const userReviewSchema = Joi.object({
  rating: Joi.number().required(),
  title: Joi.string()
    .min(3)
    .required(),
  review: Joi.string()
    .min(3)
    .required()
});

const mergeUserInfoAndCreateReview = async (req, res, next) => {
  const result = userReviewSchema.validate(req.body);
  if (result.error) {
    const err = new Error(result.error.details[0].message);
    err.statusCode = 400;
    next(err);
  } else {
    const newReviewWithoutUUID = {
      userId: req.user.id,
      username: req.user.name,
      ...req.body
    };
    const newReview = {
      id: uuidv4(),
      ...newReviewWithoutUUID
    }
    const company = await Company.findOne({ name: req.params.companyId });
    company.reviews.push(newReview);
    const updated = await company.save();
    res.status(201).json(newReviewWithoutUUID);
  }
};

module.exports = { mergeUserInfoAndCreateReview };
