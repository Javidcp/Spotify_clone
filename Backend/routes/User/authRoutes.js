const express = require("express")
const { registerUser, loginUser, googleAuth, checkEmailExists } = require("../../controllers/User/authController")

const router = express.Router()

router.post('/register', registerUser)
router.post('/check-email', checkEmailExists)
router.post('/login', loginUser)
router.post("/google-auth", googleAuth);

module.exports = router