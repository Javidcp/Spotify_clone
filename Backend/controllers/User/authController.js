const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createError, errorHandling } = require("../../helper/errorMiddleware");
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


const generateAccessToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "60m",
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
        return next(createError(400, "Email is required" ));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return next(createError(400, "Email is already registered" ));
    }

    res.status(200).json({ message: "Email is available" });
});



exports.registerUser = errorHandling(async (req, res, next) => {
    const { username, email, password, dateOfBirth, gender } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return next(createError(400, "User already exists"));
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashed, dateOfBirth, gender });
    await user.save();

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
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
        return next(createError(400, "User not registered"));
    }
    
    if (user && user.isActive === false) {
        return next(createError(403, "Your account has been blocked. Please contact support."));
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        return next(createError(400, "Invalid password"));
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
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
        return next(createError(400, "Email already registered with a different method. Please login with email/password."));
    }

    if (user && user.isActive === false) {
        return next(createError(403, "Your account has been blocked. Please contact support."));
    }

    if (!user) {
        user = await User.create({
            username: name,
            email,
            profileImage: picture,
            googleId,
            likedSongs: [],
            isPremium: false,
            isActive: true,
        });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure:  process.env.NODE_ENV === "production",
        sameSite: "Lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    console.log(req.cookies, "cookieeee");
    

    res.json({
        message: "Google login successful",
        user: {
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            isPremium: user.isPremium,
            isActive: user.isActive,
            likedSongs: user.likedSongs,
        },
        token: accessToken,
    });
});



exports.forgotPassword = errorHandling(async (req, res, next) => {
    const { email, newPassword } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) return next(createError(404, "User not found" ));

            const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
        return res.status(400).json({ message: "New password is the same as the old password" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    
    res.json({ message: "Password updated successfully" });
})



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
        return next(createError(404, 'User not found' ));
    }

    return res.status(200).json({ user: updatedUser });
});




exports.refreshAccessToken = errorHandling(async (req, res, next) => {
    const token = req.cookies.refreshToken;
    if (!token) {
        return next(createError(400, "No refresh token provided"));
    }

    try {
        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) return next(createError(404, "User not found"));
        
        const accessToken = generateAccessToken(user);
        console.log("Cookies:", req.cookies);

        res.json({ token: accessToken });
    } catch (error) {
        return next(createError(403, "Invalid refresh token"));
    }
});



exports.logoutUser = errorHandling(async (req, res, next) => {
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logged out successfully" });
});
