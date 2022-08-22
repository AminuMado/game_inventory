//Require Review model
const Review = require("../models/review");
const Game = require("../models/game");
// Require async
const async = require("async");
// Display list of All Review
exports.review_list = (req, res) => {
  Review.find().exec((err, list_review) => {
    if (err) return next(err);
    // Successful
    res.render("review_list", {
      title: "All Reviews",
      review_list: list_review,
    });
  });
};

// Display Details for a Specific Review
exports.review_detail = (req, res, next) => {
  Review.findById(req.params.id)
    .populate("game")
    .exec((err, result) => {
      if (err) return next(err);
      if (result === null) {
        const err = new Error("Review not Found");
        err.status = 404;
        return next(err);
      }
      // sucessfull
      res.render("review_detail", { title: "Review Detail", review: result });
    });
};

// Display Create Form on GET
exports.review_create_get = (req, res, next) => {
  Game.find().exec((err, result) => {
    if (err) return next(err);
    // Successful
    res.render("review_form", { title: "Create Review", games: result });
  });
};
// Handle Create on POST
exports.review_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Review Create POST");
};

// Display Delete Form on GET
exports.review_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Review Delete GET");
};
// Handle Delete on POST
exports.review_delete_post = (req, res) => {
  res.send("NOT IMPLMENTED:Review Delete POST");
};

// Display Update Form on GET
exports.review_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Review Update GET");
};

// Handle Update on POST
exports.review_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Review Update POST");
};
