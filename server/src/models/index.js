// include all of your models here using CommonJS requires
const User = require("./User.js");
const Category = require("./Category.js");
const Activity = require("./Activity.js");
const Review = require("./Review.js")
const Rating = require("./Rating.js")

module.exports = { Activity, User, Category, Review, Rating };
