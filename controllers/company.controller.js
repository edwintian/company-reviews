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

const findById = async input => {
  const filtered = await Company.findOne({ id: input }).select('-__v -_id');
  return filtered;
};

const getOneCompany = (req, res, next) => {
  findById(req.params.companyId)
    .then(data => {
      if (data !== null) {
        res.json(data);
      } else {
        const err = new Error(
          "Unable to fetch company info due to id not found"
        );
        err.statusCode = 404;
        next(err);
      }
    })
    .catch(err => next(err));
};

module.exports = {
  getAllCompanies,
  getOneCompany
};
