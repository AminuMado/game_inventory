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
  async.parallel(
    {
      developers: function (callback) {
        Developer.find().exec(callback);
      },
      platforms: function (callback) {
        Platform.find().exec(callback);
      },
      genres: function (callback) {
        Genre.find().exec(callback);
      },
    },
    (err, results) => {
      if (err) return next(err);
      res.render("game_form", {
        title: "Create Game",
        developers: results.developers,
        platforms: results.platforms,
        genres: results.genres,
      });
    }
  );
};

// Handle Game Create on POST
exports.game_create_post = [
  //The reason for the conversion below is due to the fact that in our model our platforms and genres is an array of platforms and genres
  // Convert platform to an array.
  (req, res, next) => {
    if (!Array.isArray(req.body.platform)) {
      req.body.platform =
        typeof req.body.platform === "undefined" ? [] : [req.body.platform];
    }
    next();
  },
  // Convert genre to an array
  (req, res, next) => {
    if (!Array.isArray(req.body.genre)) {
      req.body.genre =
        typeof req.body.genre === "undefined" ? [] : [req.body.genre];
    }
    next();
  },
  // Validate and sanitize fields
  body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("releaseDate", "Release Date must not be empty")
    .isLength({ min: 4 })
    .escape(),
  body("director", "Director must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("summary", "Summary must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("developer", "Developer must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("platform.*").escape(),
  body("genre.*").escape(),
  //Process request after validation and sanitization
  (req, res, next) => {
    // Extract the validation errors from a request
    const errors = validationResult(req);
    // Create a Game object with escaped and trimmed data.
    const game = new Game({
      name: req.body.name,
      releaseDate: req.body.releaseDate,
      director: req.body.director,
      summary: req.body.summary,
      developer: req.body.developer,
      platform: req.body.platform,
      genre: req.body.genre,
      photo: req.body.photo,
    });
    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.
      // Get all developers, platforms and genres for form.
      async.parallel(
        {
          developers: function (callback) {
            Developer.find(callback);
          },
          platforms: function (callback) {
            Platform.find(callback);
          },
          genres: function (callback) {
            Genre.find(callback);
          },
        },
        (err, results) => {
          if (err) return next(err);
          // Mark our selected genres as checked
          for (const genre of results.genres) {
            if (game.genre.includes(genre._id)) {
              genre.checked = "true";
            }
          }
          // Mark our selected platforms as checked
          for (const platform of results.platforms) {
            if (game.platform.includes(platform._id)) {
              platform.checked = "true";
            }
          }
          res.render("game_form", {
            title: "Create Game",
            game,
            platforms: results.platforms,
            genres: results.genres,
            errors: errors.array(),
          });
        }
      );
      return;
    }
    // Data from form is valid. Save Game
    game.save((err) => {
      if (err) return next(err);
      // Succesfull: redirect to new game page
      res.redirect(game.url);
    });
  },
];

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
