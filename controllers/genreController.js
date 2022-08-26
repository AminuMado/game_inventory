//require the genre model
const Genre = require("../models/genre");
const Game = require("../models/game");
const async = require("async");
const { body, validationResult } = require("express-validator");

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
exports.genre_create_get = (req, res, next) => {
  res.render("genre_form", { title: "Create Genre" });
};

// Handle Create Form on POST
exports.genre_create_post = [
  // Validate and sanitize the name field.
  body("name", "Genre name required").trim().isLength({ min: 1 }).escape(),
  //Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    // Create a genre object with escaped and trimmed data.
    const genre = new Genre({ name: req.body.name });
    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized vales/error messages.
      res.render("genre_form", {
        title: "Create Genre",
        genre,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from the form is valid
      // Check if Genre with same name already exists.
      Genre.findOne({ name: req.body.name }).exec((err, found_genre) => {
        if (err) return next(err);
        if (found_genre) {
          // Genre exists, redirect to its detail page.
          res.redirect(found_genre.url);
        } else {
          // Everything is good we can finally save the created genre
          genre.save((err) => {
            if (err) return next(err);
            // Genre saved. Redirect to genre detail page.
            res.redirect(genre.url);
          });
        }
      });
    }
  },
];

// Display Delete Form on Get
exports.genre_delete_get = (req, res, next) => {
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
      if (err) return next(err);
      if (results.genre == null) {
        // No results
        res.redirect("/genres");
      }
      // Succesful so render
      res.render("genre_delete", {
        title: "Delete Genre",
        genre: results.genre,
        genre_games: results.genre_games,
      });
    }
  );
};

// Handle Delete on POST
exports.genre_delete_post = (req, res, next) => {
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
      if (err) return next(err);
      // Success, we now check if the genre has games associated with it
      if (results.genre_games.length > 0) {
        // Genre has games associated with it
        res.render("genre_delete", {
          title: "Delete Genre",
          genre: results.genre,
          genre_games: results.genre_games,
        });
        return;
      }
      // Genre has no games. We can now delete the genre
      Genre.findByIdAndRemove(req.body.genreId, (err) => {
        if (err) return next(err);
        // Success... Genre has been deleted, go to genre list
        res.redirect("/genres");
      });
    }
  );
};

// Display Update Form on GET
exports.genre_update_get = (req, res, next) => {
  // Get the genre and poplulate its fields with its values
  Genre.findById(req.params.id).exec((err, genre) => {
    if (err) return next(err);
    if (genre == null) {
      // No results
      const err = new Error("Genre not found");
      err.status = 404;
      return next(err);
    }
    // Success render form with genre details
    res.render("genre_form", { title: "Update Genre", genre });
  });
};
// Handle Update on POST
exports.genre_update_post = [
  // Validate and sanitize the name field.
  body("name", "Genre name required").trim().isLength({ min: 1 }).escape(),
  //Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    // Create a genre object with escaped and trimmed data and old id
    const genre = new Genre({
      name: req.body.name,
      _id: req.params.id, // This is required or a new ID will be created
    });
    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized vales/error messages.
      res.render("genre_form", {
        title: "Update Genre",
        genre,
        errors: errors.array(),
      });
      return;
    } else {
      // Data is valid we can update the genre
      Genre.findByIdAndUpdate(req.params.id, genre, {}, (err, updatedGenre) => {
        if (err) return next(err);
        // Successfull .... redirect to genre detail page
        res.redirect(updatedGenre.url);
      });
    }
  },
];
