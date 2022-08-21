// Require Models
const Developer = require("../models/developer");
const Game = require("../models/game");

// Require async
const async = require("async");
// Require body and validator
const { body, validationResult } = require("express-validator");
// Display list of All Developers
exports.developer_list = (req, res) => {
  Developer.find().exec((err, list_developer) => {
    if (err) {
      return next(err);
    }
    // Successful
    res.render("developer_list", {
      title: "All Developers",
      developer_list: list_developer,
    });
  });
};

// Display Detail page for a Specific Developer
exports.developer_detail = (req, res, next) => {
  async.parallel(
    {
      developer: function (callback) {
        Developer.findById(req.params.id).exec(callback);
      },
      developer_games: function (callback) {
        Game.find({ developer: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) next(err);
      if (results.developer == null) {
        // No results
        const err = new Error("Developer not found");
        err.status = 404;
        return next(err);
      }
      // Succesful
      res.render("developer_detail", {
        title: "Developer Detail",
        developer: results.developer,
        developer_games: results.developer_games,
      });
    }
  );
};

// Display Create Form on GET
exports.developer_create_get = (req, res) => {
  res.render("developer_form", { title: "Create Developer" });
};

// Handle Create on POST
exports.developer_create_post = [
  // Validate and santize the name field.
  body("name", "Developer name required").trim().isLength({ min: 1 }).escape(),
  // Validate and sanitize the summary field.
  body("summary", "Developer summary required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  // Validate and sanitize the founded field.
  body("founded", "Developer established date is required")
    .isLength({ min: 4 })
    .escape(),
  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    // Create a developer object with escaped and trimmed data.
    const developer = new Developer({
      name: req.body.name,
      founded: req.body.founded,
      summary: req.body.summary,
      icon: req.body.icon,
    });
    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("developer_form", {
        title: "Create Developer",
        developer,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from the form is valid
      // Check if Developer with same name already exists.
      Developer.findOne({ name: req.body.name }).exec(
        (err, found_developer) => {
          if (err) return next(err);
          if (found_developer) {
            // Developer exists, redirect to its detail page.
            res.redirect(found_developer.url);
          } else {
            // Everything is good we can finally save he created developer
            developer.save((err) => {
              if (err) return next(err);
              // Developer saved. Redirect to developer detail page.
              res.redirect(developer.url);
            });
          }
        }
      );
    }
  },
];

// Display Delete Form on GET
exports.developer_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Developer Delete GET");
};

// Handle Delete on POST
exports.developer_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Developer Delete POST");
};

// Display Update Form on GET
exports.developer_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Developer Update GET");
};

// Handle Update on POST
exports.developer_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: DeveloperUpdate POST");
};
