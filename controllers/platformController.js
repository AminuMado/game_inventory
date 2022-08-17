// Require Platfrom Model
const Platform = require("../models/platform");
const Game = require("../models/game");
// Require async
const async = require("async");
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
      console.log(results);
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
  res.send("NOT IMPLEMENTED: Platform Create GET");
};
// Handle Create on POST
exports.platform_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Platform Create POST");
};

// Display Delete Form on GET
exports.platform_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Platfrom Delete GET");
};
// Handle Delete on POST
exports.platform_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Platform Delete POST");
};

// Display Update Form on GET
exports.platform_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Platform Update GET");
};
// Handle Update on POST
exports.platform_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Platform Update POST");
};
