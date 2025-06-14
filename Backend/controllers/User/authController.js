const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const errorHandling = require("../../helper/errorMiddleware");
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


const generateAccessToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "20m",
    });
};

const generateRefreshToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
    });
};



exports.checkEmailExists = errorHandling(async (req, res, next) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "Email is already registered" });
    }

    res.status(200).json({ message: "Email is available" });
});



exports.registerUser = errorHandling(async (req, res, next) => {
    const { username, email, password, dateOfBirth, gender } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return next(new Error("User already exists"));
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashed, dateOfBirth, gender });
    await user.save();

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
        message: "User registered successfully",
        user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        },
        token: accessToken,
    });
});



exports.loginUser = errorHandling(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return next(new Error("User not registered"));
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        return next(new Error("Invalid password"));
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
        message: "Login successful",
        user,
        token: accessToken,
    });
});


exports.googleAuth = errorHandling(async (req, res, next) => {
    const { credential } = req.body;

    const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture  } = payload;

    let user = await User.findOne({ email });

    if (user && !user.googleId) {
        return res.status(400).json({
            message: "Email already registered with a different method. Please login with email/password."
        });
    }

    if (!user) {
        user = await User.create({
            username: name,
            email,
            profileImage: picture,
            googleId,
            likedSongs: [],
            isPremium,
        });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
        message: "Google login successful",
        user: {
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            isPremium: user.isPremium,
            likedSongs: user.likedSongs,
        },
        token: accessToken,
    });
});



exports.updateProfile = errorHandling(async (req, res) => {
    const userId = req.userId;
    const { username } = req.body;
    const updateData = {};
    if (username) updateData.username = username;

    if (req.file) {
        updateData.profileImage = req.file.path;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
    if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ user: updatedUser });
});




exports.refreshAccessToken = errorHandling(async (req, res, next) => {
    const token = req.cookies.refreshToken;
    if (!token) {
        return next(new Error("No refresh token provided"));
    }

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
        return next(new Error("Invalid refresh token"));
        }
        const accessToken = generateAccessToken(user);
        res.json({ token: accessToken });
    });
});



exports.logoutUser = errorHandling(async (req, res, next) => {
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logged out successfully" });
});
