// Require Platfrom Model
const Platform = require("../models/platform");
const Game = require("../models/game");
// Require async
const async = require("async");
// Require body and validator
const { body, validationResult } = require("express-validator");

// Display List of all Platforms
exports.platform_list = (req, res) => {
  Platform.find().exec((err, list_platform) => {
    if (err) return next(err);
    // Successful
    res.render("platform_list", {
      title: "All Platforms",
      platform_list: list_platform,
    });
  });
};
// Display a Detail Page for a Specific Platform
exports.platform_detail = (req, res, next) => {
  async.parallel(
    {
      platform: function (callback) {
        Platform.findById(req.params.id).exec(callback);
      },
      platform_games: function (callback) {
        Game.find({ platform: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) return next(err);
      if (results.platform == null) {
        // No results.
        const err = new Error("Platform not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render
      res.render("platform_detail", {
        title: "Platform Detail",
        platform: results.platform,
        platform_games: results.platform_games,
      });
    }
  );
};

// Display Create Form on GET
exports.platform_create_get = (req, res) => {
  res.render("platform_form", { title: "Create Platform" });
};
// Handle Create on POST
exports.platform_create_post = [
  // Validate and sanitize the name field.
  body("name", "Platform name required").trim().isLength({ min: 1 }).escape(),
  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    // Create a platform object with escaped and trimmed data.
    const platform = new Platform({ name: req.body.name, icon: req.body.icon });
    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized vales/error messages.
      res.render("platform_form", {
        title: "Create Platform",
        platform,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from the form is valid
      // Check if Platform with same name already exists.
      Platform.findOne({ name: req.body.name }).exec((err, found_platform) => {
        if (err) return next(err);
        if (found_platform) {
          // Platform exists, redirect to its detail page.
          res.redirect(found_platform.url);
        } else {
          // Everything is good we can finally save the created platform
          platform.save((err) => {
            if (err) return next(err);
            // Platform saved. Redirect to platform detail page.
            res.redirect(platform.url);
          });
        }
      });
    }
  },
];

// Display Delete Form on GET
exports.platform_delete_get = (req, res, next) => {
  async.parallel(
    {
      platform: function (callback) {
        Platform.findById(req.params.id).exec(callback);
      },
      platform_games: function (callback) {
        Game.find({ platform: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) return next(err);
      if (results.platform == null) {
        // No results
        res.redirect("/platforms");
      }
      // Succesful so render
      res.render("platform_delete", {
        title: "Delete Platform",
        platform: results.platform,
        platform_games: results.platform_games,
      });
    }
  );
};
// Handle Delete on POST
exports.platform_delete_post = (req, res, next) => {
  async.parallel(
    {
      platform: function (callback) {
        Platform.findById(req.params.id).exec(callback);
      },
      platform_games: function (callback) {
        Game.find({ platform: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) return next(err);
      // Success we now check if the platform has games associated with it
      if (results.platform_games.length > 0) {
        // Platform has games associated with it so we rerender
        res.render("platform_delete", {
          title: "Delete Platform",
          platform: results.platform,
          platform_games: results.platform_games,
        });
        return;
      }
      // Platform has no games. We can now delete the platform
      Platform.findByIdAndRemove(req.body.platformId, (err) => {
        if (err) return next(err);
        // Success... Platform has been deeted, go to platform list
        res.redirect("/platforms");
      });
    }
  );
};

// Display Update Form on GET
exports.platform_update_get = (req, res, next) => {
  // Get the platform in question adn populate its fields with its data
  Platform.findById(req.params.id).exec((err, platform) => {
    if (err) return next(err);
    if (platform == null) {
      // No results
      const err = new Error("Platform not Found");
      err.status = 404;
      return next(err);
    }
    // Success render form with platform details
    res.render("platform_form", { title: "Update Platform", platform });
  });
};
// Handle Update on POST
exports.platform_update_post = [
  // Validate and sanitize the name field.
  body("name", "Platform name required").trim().isLength({ min: 1 }).escape(),
  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    // Create a platform object with escaped and trimmed data and old id.
    const platform = new Platform({
      name: req.body.name,
      icon: req.body.icon,
      _id: req.params.id, // This is required or a new ID will be created
    });
    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized vales/error messages.
      res.render("platform_form", {
        title: "Update Platform",
        platform,
        errors: errors.array(),
      });
      return;
    } else {
      // Data is valid we can now update the platform
      Platform.findByIdAndUpdate(
        req.params.id,
        platform,
        {},
        (err, updatedPlatform) => {
          if (err) return next(err);
          // Successfull ... redirect to platform page
          res.redirect(updatedPlatform.url);
        }
      );
    }
  },
];
