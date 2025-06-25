const Song = require('../../models/Song');
const Artist = require('../../models/Artist');
const GenrePlaylist = require("../../models/GenrePlaylist")
const dotenv = require("dotenv")
const { createError, errorHandling } = require("../../helper/errorMiddleware")
dotenv.config()

exports.addSong = errorHandling(async (req, res, next) => {
    const { title, artist, genre, duration } = req.body;

    const songFile = req.files['url'] ? req.files['url'][0].path : null;
    const coverImageFile = req.files['coverImage'] ? req.files['coverImage'][0].path : null;

    if (!songFile) return next(new Error("Audio file is required"))

    const genreDoc = await GenrePlaylist.findOne({ name: genre });
    if (!genreDoc) return next(new Error("Invalid genre"));

    const newSong = new Song({ title,  genre: genreDoc._id, artist, duration, url: songFile, coverImage: coverImageFile });
    const savedSong = await newSong.save();

    await Artist.updateMany(
        { _id: { $in: artist } },
        { $push: { songs: savedSong._id } }
    );

    await GenrePlaylist.updateOne(
        { _id: genreDoc._id },
        { $push: { songs: savedSong._id } }
    );

    res.status(201).json({ message: "Song added successfully", song: newSong });
});



exports.getAllSongs = errorHandling(async (req, res) => {
    const songs = await Song.find().populate('artist').populate("genre");
    res.status(200).json(songs);
});
