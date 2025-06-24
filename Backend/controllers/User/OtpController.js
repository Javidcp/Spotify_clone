const Otp = require('../../models/Otp');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const User = require("../../models/User")
const jwt = require('jsonwebtoken');
const { createError, errorHandling  } = require("../../helper/errorMiddleware")

exports.sendOTP = errorHandling(async (req, res, next) => {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);

        await Otp.deleteMany({ email });
        await Otp.create({ email, otp: hashedOtp });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP is ${otp}. It expires in 5 minutes.`
        };

        console.log("Email:", email);
        console.log("Using Gmail:", process.env.EMAIL_USER);
        console.log("OTP:", otp);

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'OTP sent to email', otp });
});

exports.verifyOTP = errorHandling(async (req, res, next) => {
    const { email, otp } = req.body;

        const record = await Otp.findOne({ email });
        if (!record) return next(createError(400, "OTP expired or not found"))

        const isValid = await bcrypt.compare(otp, record.otp);
        if (!isValid) return next(createError(400, "Invalid OTP"))

        let user = await User.findOne({ email });
        if (!user) return next(createError(404, "User not found"))
        if (user && user.isActive === false) return next(createError(403, "Your account has been blocked. Please contact support"))

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });

        await Otp.deleteMany({ email });
        res.status(200).json({ message: 'OTP verified successfully',token, user });
});
