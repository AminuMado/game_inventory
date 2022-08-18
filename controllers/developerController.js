// Require Models
const Developer = require("../models/developer");
const Game = require("../models/game");

// Require async
const async = require("async");

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
  res.send("NOT IMPLEMENTED: Developer Create GET");
};

// Handle Create on POST
exports.developer_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Developer Create POST");
};

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
