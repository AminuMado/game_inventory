const Game = require("../models/game");
const Genre = require("../models/genre");
const Developer = require("../models/developer");
const Platform = require("../models/platform");
const Review = require("../models/review");
const async = require("async");
const { body, validationResult } = require("express-validator");
//Display Home Page
exports.home_page = (req, res) => {
  async.parallel(
    {
      game_count: function (callback) {
        Game.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
      },
      developer_count: function (callback) {
        Developer.countDocuments({}, callback);
      },
      platform_count: function (callback) {
        Platform.countDocuments({ status: "Available" }, callback);
      },
      review_count: function (callback) {
        Review.countDocuments({}, callback);
      },
      genre_count: function (callback) {
        Genre.countDocuments({}, callback);
      },
    },
    (err, results) => {
      res.render("index", {
        title: "The Bonfire",
        error: err,
        data: results,
      });
    }
  );
};

// Display list of all Games
exports.game_list = (req, res, next) => {
  Game.find({}).exec(function (err, list_games) {
    if (err) {
      return next(err);
    }
    //Successful, so render
    res.render("game_list", { title: "All Games", game_list: list_games });
  });
};

// Display Detail Page for a specific Game
exports.game_detail = (req, res, next) => {
  Game.findById(req.params.id).exec((err, result) => {
    if (err) return next(err);
    if (result === null) {
      const err = new Error("Game not Found");
      err.status = 404;
      return next(err);
    }
    // Successfull
    res.render("game_detail", { title: "Game Detail", game: result });
  });
};

// Display Game Create form on GET
exports.game_create_get = (req, res, next) => {
  // Get all developers, platforms and genres which we need before we can create a game
  async.parallel({
    developers: function (callback) {
      Developer.find(callback);
    },
    platforms: function (callback) {
      Platform.find(callback);
    },
    genres: function (callback) {
      Genre.find(callback);
    },
  }),
    (err, results) => {
      if (err) return next(err);
      res.render("game_form", {
        title: "Create Game",
        developers: results.developers,
        platforms: results.platforms,
        genres: results.genres,
      });
    };
};

// Handle Game Create on POST
exports.game_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Game Create POST");
};

// Display Game Delete Form on GET
exports.game_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Game Delete GET");
};
// Handle Game Delete on POST
exports.game_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Game Delete POST");
};
// Display Game Update Form on GET
exports.game_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Game Update GET");
};
// Handle Game Update Form on POST
exports.game_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Game Update POST");
};
