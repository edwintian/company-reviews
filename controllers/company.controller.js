require("../utils/db");
const Company = require("../models/company.model");

const findAll = async () => {
  const found = await Company.find().select('-id -__v -_id -reviews');
  return found;
};

const getAllCompanies = (req, res, next) => {
  findAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => next(err));
};

module.exports = {
  getAllCompanies
};
