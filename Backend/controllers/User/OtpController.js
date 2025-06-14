const Otp = require('../../models/Otp');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const User = require("../../models/User")
const jwt = require('jsonwebtoken');

exports.sendOTP = async (req, res) => {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);

    try {
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

        res.status(200).json({ message: 'OTP sent to email' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending OTP', error });
    }
};

exports.verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const record = await Otp.findOne({ email });
        if (!record) return res.status(400).json({ message: 'OTP expired or not found' });

        const isValid = await bcrypt.compare(otp, record.otp);
        if (!isValid) return res.status(400).json({ message: 'Invalid OTP' });

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });

        await Otp.deleteMany({ email });
        res.status(200).json({ message: 'OTP verified successfully',token, user });

    } catch (error) {
        res.status(500).json({ message: 'Error verifying OTP', error });
    }
};
