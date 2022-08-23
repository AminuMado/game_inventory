//Require Review model
const Review = require("../models/review");
const Game = require("../models/game");
// Require async
const async = require("async");
const { body, validationResult } = require("express-validator");
// Display list of All Review
exports.review_list = (req, res) => {
  Review.find()
    .populate("game")
    .sort([["game", "ascending"]])
    .exec((err, list_review) => {
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
    .exec((err, review) => {
      if (err) return next(err);
      if (review === null) {
        const err = new Error("Review not Found");
        err.status = 404;
        return next(err);
      }
      // sucessfull
      res.render("review_detail", { title: "Review Detail", review });
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
exports.review_create_post = [
  // Validate and sanitize fields
  body("snippet", "Snippet must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  body("sourceSite", "Source Site must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("link", "link must not be empty").trim().isLength({ min: 1 }).escape(),
  body("rating", "Rating must not be empty.")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("game.*").escape(),

  //Process request after validation and sanitization
  (req, res, next) => {
    // Get unescaped versions of sanitized links
    let unescapedLink = req.body.link.replace(/&#x2F;/g, "/");
    let unescapedRating = req.body.rating.replace(/&#x2F;/g, "/");
    let unescapedSnippet = req.body.snippet.replace(/&#x27;/g, "'");
    // Extract the validation errors from a request
    const errors = validationResult(req);
    // Create a review object with escaped and trimmed data.
    const review = new Review({
      game: req.body.game,
      snippet: unescapedSnippet,
      sourceSite: req.body.sourceSite,
      rating: unescapedRating,
      link: unescapedLink,
    });
    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages
      // Get all games for form.
      Game.find().exec((err, games) => {
        if (err) return next(err);
        // Succesfull
        res.render("review_form", {
          title: "Create Review",
          review,
          games,
          errors: errors.array(),
        });
      });
      return;
    }
    // Data from form is valid. Save Review
    review.save((err) => {
      if (err) return next(err);
      // Succesfull: redirect to review page
      console.log("Saving");
      res.redirect(review.url);
    });
  },
];

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
