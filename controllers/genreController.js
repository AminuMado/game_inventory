//require the genre model
const Genre = require("../models/genre");
const async = require("async");
const Game = require("../models/game");

// Display list of All Genres
exports.genre_list = (req, res) => {
  Genre.find().exec((err, list_genre) => {
    if (err) {
      return next(err);
    }
    //Successful
    res.render("genre_list", { title: "All Genres", genre_list: list_genre });
  });
};

// Display Detail Page for a Specific Genre
exports.genre_detail = (req, res, next) => {
  // So basically we need to find the games associated with a specific genre
  // So we'd need an async process and also query the game details associated with
  // the game that has the same id as the id as specified in the model
  // Display detail page for a specific Genre.
  // Display detail page for a specific Genre.
  async.parallel(
    {
      genre: function (callback) {
        Genre.findById(req.params.id).exec(callback);
      },
      genre_games: function (callback) {
        Game.find({ genre: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.genre == null) {
        // No results.
        const err = new Error("Genre not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render
      res.render("genre_detail", {
        title: "Genre Detail",
        genre: results.genre,
        genre_games: results.genre_games,
      });
    }
  );
};

// Display Create Form on GET
exports.genre_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Genre Create GET");
};

// Handle Create  on POST
exports.genre_create_post = (req, res) => {
  res.send("NOT IMPLMENTED: Genre Create POST");
};

// Display Delete Form on Get
exports.genre_delete_get = (req, res) => {
  res.send("NOT IMPLMENTED: Genre Delete GET");
};

// Handle Delete on POST
exports.genre_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Genre Delete POST");
};

// Display Update Form on GET
exports.genre_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Genre Update GET");
};
// Handle Update on POST
exports.genre_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Genre Update POST");
};
