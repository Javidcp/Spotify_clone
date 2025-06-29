const express = require("express")
const connectDB = require("./config/db")
const dotenv = require("dotenv")
const cookieParser = require('cookie-parser');
const authRoutes = require("./routes/User/authRoutes")
const cors = require("cors")
const User = require("./models/User")
const verifyToken = require("./middleware/verifyToken")
const otpRoutes = require('./routes/User/OtpRoutes');
const userRoutes = require("./routes/Admin/userRoute")
const songRoutes = require("./routes/Admin/songRoutes")
const artistRoutes = require("./routes/Admin/artistRoute")
const genreRoutes = require("./routes/Admin/genreRoute")
const searchRoutes = require("./routes/User/searchRoutes")
const path = require("path");
const { errorMiddleware } = require("./helper/errorMiddleware");

dotenv.config()

const app = express()
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}))

const route = express.Router()


connectDB()

app.use("/api/auth", authRoutes)
app.use('/api/otp', otpRoutes)

app.use('/api/auth', userRoutes)
app.use('/api/songs', songRoutes)
app.use('/api/artist', artistRoutes)
app.use('/api', genreRoutes)
app.use('/api/search', searchRoutes)



route.get('/me', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user) {
        return res.status(404).json({ message: "User not found" });
        }
        const { profileImage, name } = user
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
app.use('/api/auth', route);

app.use(errorMiddleware)


app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`);
})