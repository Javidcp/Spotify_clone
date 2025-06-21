const express = require("express")
const router = express.Router()
const verifyToken = require("../../middleware/verifyToken");
const { getAllUsers, toggleBlockUser } = require("../../controllers/Admin/userController");


router.get('/users', verifyToken, getAllUsers)
router.patch('/users/:id', verifyToken, toggleBlockUser)

module.exports = router