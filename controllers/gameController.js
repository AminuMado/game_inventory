//Display Home Page
exports.home_page = (req, res) => {
  res.render("index", { title: "The Bonfire" });
};

// Display list of all Games
exports.game_list = (req, res) => {
  res.send("NOT IMPLEMENTED: Game List");
};

// Display Detail Page for a specific Game
exports.game_detail = (req, res) => {
  res.send("NOT IMPLEMENTED: Game Detail: " + req.params.id);
};

// Display Game Create form on GET
exports.game_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Game Create GET");
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
