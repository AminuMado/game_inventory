//require the genre model
const Genre = require("../models/genre");
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
exports.genre_detail = (req, res) => {
  res.send("NOT IMPLEMENTED: Genre Detail " + req.params.id);
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
