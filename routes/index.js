var express = require("express");
var router = express.Router();

// Require Controller Modules
const developer_controller = require("../controllers/developerController");
const game_controller = require("../controllers/gameController");
const genre_controller = require("../controllers/genreController");
const platform_controller = require("../controllers/platformController");
const review_controller = require("../controllers/reviewController");
const genre = require("../models/genre");

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

/// DEVELOPER ROUTES ///

// Get Request for Creating a Developer NOTE This must come before routes that display developer (uses id)
router.get("/developer/create", developer_controller.developer_create_get);
// Post Request for Creating a Developer
router.get("/developer/create", developer_controller.developer_create_post);

// Get Request for Deleting a Developer
router.get("/developer/:id/delete", developer_controller.developer_delete_get);
// Post Request for Deleting a Developer
router.post(
  "/developer/:id/delete",
  developer_controller.developer_delete_post
);

// Get Request to Update a Developer
router.get("/developer/:id/update", developer_controller.developer_update_get);
// Post Request to Update a Developer
router.post(
  "/developer/:id/update",
  developer_controller.developer_update_post
);

// Get Request for one Developer
router.get("/developer/:id", developer_controller.developer_detail);

//Get Request for all Developers
router.get("/developers", developer_controller.developer_list);

// PLATFORM ROUTES

// Get Request to Create a Platform
router.get("/platform/create", platform_controller.platform_create_get);
// Post Request to Create a Platform
router.post("/platform/create", platform_controller.plaform_create_post);

// Get Request to Delete a Platform
router.get("/platform/:id/delete", platform_controller.platform_delete_get);
// Post Request to Delete a Platform
router.get("/platform/:id/delete", platform_controller.platform_delete_post);

// Get Request to Update a Platform
router.get("/platform/:id/update", platform_controller.platform_update_get);
// Post Request to Update a Platform
router.post("/platform/:id/update", platform_controller.platform_update_post);

// Get Request for one Platform
router.get("/platform/:id", platform_controller.platform_detail);
// Get Request for all Platforms
router.get("/platforms", platform_controller.platform_list);

// GENRE ROUTES

// Get Request to Create a Genre
router.get("/genre/create", genre_controller.genre_create_get);
// Post Request to Create a Genre
router.post("/genre/create", genre_controller.genre_create_post);

// Get Request to Delete a Genre
router.get("/genre/:id/delete", genre_controller.genre_delete_get);
// Post Request to Delete a Genre
router.post("/genre/:id/delete", genre_controller.genre_delete_post);

// Get Request to Update a Genre
router.get("/genre/:id/update", genre_controller.genre_update_get);
// Post Request to Update a Genre
router.post("/genre/:id/update", genre_controller.genre_update_post);

// Get Request for one Genre
router.get("/genre/:id", genre_controller.genre_detail);
// Get Request for all Genres
router.get("/genres", genre_controller.genre_list);

// REVIEW ROUTES

// Get Request to Create a Review
router.get("/review/create", review_controller.review_create_get);
// Post Request to Create a Review
router.post("/review/create", review_controller.review_create_post);

// Get Request to Delete a Review
router.get("/review/:id/delete", review_controller.review_delete_get);
// Post Request to Delete a Review
router.post("/review/:id/delete", review_controller.review_delete_post);

// Get Request to Update a Review
router.get("/review/:id/update", review_controller.review_update_get);
// Post Request to Update a Revie
router.post("/review/:id/update", review_controller.review_update_post);

// Get Request for one Review
router.get("/review/:id", review_controller.review_detail);
// Get Request for all Reviews
router.get("/reviews", review_controller.review_list);

// Export Module
module.exports = router;
