const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    username: { type: String, trim: true },
    email: { type: String, unique: true, required: true, trim: true },
    password: { type: String },
    dateOfBirth: { type: String },
    gender: { type: String, enum: ['Man', 'Woman', 'Non-binary', 'Something else', 'Prefer not to say'] },
    profileImage: { type: String, default: '' },
    likedSongs: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "songs" 
    }],
    googleId: { type: String, default: null },
    isPremium: { type: Boolean, default: false },
    role: { type: String, default: "user", enum: ["user", "admin"] },
    isActive: { type: Boolean, default: true },
    recentlyPlayed: [
        {
        itemType: { type: String, enum: ['song', 'artist', 'playlist'] },
        itemId: mongoose.Schema.Types.ObjectId,
        playedAt: { type: Date, default: Date.now }
    }
    ]
}, { timestamps: true })



const User = mongoose.model('User', userSchema)
module.exports = User