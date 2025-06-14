const express = require("express")
const { registerUser, loginUser, googleAuth, checkEmailExists, updateProfile, refreshAccessToken } = require("../../controllers/User/authController")
const validate = require('../../middleware/validateRequest');
const {
    registerSchema,
    loginSchema,
    googleAuthSchema,
    updateProfileSchema
} = require('../../validators/userValidator');
const verifyToken = require("../../middleware/verifyToken");
const upload = require("../../multer/multer")

const router = express.Router()

router.post('/register', validate(registerSchema), registerUser)
router.post('/check-email', checkEmailExists)
router.post('/login', validate(loginSchema), loginUser)
router.get('/refresh-token', refreshAccessToken);
router.post("/google-auth", validate(googleAuthSchema), googleAuth);
router.put("/update-profile", verifyToken, validate(updateProfileSchema), upload.single('profileImage'), updateProfile)

module.exports = router