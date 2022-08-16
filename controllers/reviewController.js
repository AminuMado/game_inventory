//Require Review model
const Review = require("../models/review");
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
exports.review_detail = (req, res) => {
  res.send(`NOT IMPLEMENTED: Review Detail ${req.params.id}`);
};

// Display Create Form on GET
exports.review_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Review Create GET");
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
