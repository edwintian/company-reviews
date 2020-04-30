const mongoose = require("mongoose");

const reviewsSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    minlength: 3,
    unique: true
  },
  userId: {
    type: String,
    required: true,
    minlength: 3,
    unique: true
  },
  username: {
    type: String,
    minlength: 3,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  review: {
    type: String,
    required: true
  },
});

const companySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  companyName: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  companySuffix: {
    type: String,
    minlength: 1
  },
  description: {
    type: String,
    minlength: 1
  },
  numberOfEmployees: {
    type: Number,
    unique: true
  },
  reviews: [reviewsSchema]
});

const Company = mongoose.model("Company", companySchema);
module.exports = Company;
