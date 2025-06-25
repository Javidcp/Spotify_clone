const express = require("express");
const router = express.Router();
const { createGenrePlaylist, getAllGenrePlaylists, getGenres, getGenrePlaylist } = require("../../controllers/Admin/genreController");
const upload = require("../../multer/multer");

router.post("/genre", upload.single("image"), createGenrePlaylist);
router.get("/genre", getAllGenrePlaylists);
router.get("/genreName", getGenres);
router.get("/genre-playlists/:id", getGenrePlaylist)

module.exports = router;
