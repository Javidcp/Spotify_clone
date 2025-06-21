const express = require('express');
const router = express.Router();
const { addSong, getAllSongs } = require('../../controllers/Admin/songController');
const verifyToken = require('../../middleware/verifyToken');
const upload = require("../../multer/multer")

router.post('/add' , upload.fields([
    { name: 'url', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 }
]), addSong);

router.get('/',verifyToken, getAllSongs);

module.exports = router;
