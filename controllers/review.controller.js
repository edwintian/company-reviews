require("../utils/db");
const Company = require("../models/company.model");

const mergeUserInfoAndCreateReview = (req, res, next) => {
  const newReview = {
    username: req.user.name,
    userId: req.user.id,
    ...req.body
  };
  Company.reviews
    .create(newReview)
    .then(data => res.status(201).json(data))
    .catch(err => next(err));
};

module.exports = {mergeUserInfoAndCreateReview};
