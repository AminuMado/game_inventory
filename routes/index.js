var express = require("express");
var router = express.Router();
// Require Controller Modules
const developer_controller = require("../controllers/developerController");
const game_controller = require("../controllers/gameController");
const genre_controller = require("../controllers/genreController");
const platform_controller = require("../controllers/platformController");
const reviews_controller = require("../controllers/reviewsController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "The Bonfire" });
});

/// GAME ROUTES ///

// GET  home page.
router.get("/", game_controller.index);

// GET request for creating a Game. NOTE This must come before routes that display Game (uses id).
router.get("/game/create", game_controller.game_create_get);

// POST request for creating game.
router.post("/game/create", game_controller.game_create_post);

// GET request to delete game.
router.get("/game/:id/delete", game_controller.game_delete_get);

// POST request to delete game.
router.post("/game/:id/delete", game_controller.game_delete_post);

// GET request to update game.
router.get("/game/:id/update", game_controller.game_update_get);

// POST request to update game.
router.post("/game/:id/update", game_controller.game_update_post);

// GET request for one game.
router.get("/game/:id", game_controller.game_detail);

// GET request for list of all game items.
router.get("/games", game_controller.game_list);
