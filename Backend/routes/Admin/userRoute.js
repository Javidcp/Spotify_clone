const express = require("express")
const router = express.Router()
const verifyToken = require("../../middleware/verifyToken");
const { getAllUsers } = require("../../controllers/Admin/userController");


router.get('/users', verifyToken, getAllUsers)

module.exports = router