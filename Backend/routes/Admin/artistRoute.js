const express = require("express")
const router = express.Router()
const {addArtist, getArtist} = require("../../controllers/Admin/artistController")
const upload = require("../../multer/multer")

router.post('/add', upload.single('image'), addArtist)
router.get('/', getArtist)

module.exports = router