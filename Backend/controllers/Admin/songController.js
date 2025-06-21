const Song = require('../../models/Song');
const Artist = require('../../models/Artist');
const errorHandling = require("../../helper/errorMiddleware")

exports.addSong = errorHandling(async (req, res, next) => {
    const { title, artist, genre, duration } = req.body;

    const songFile = req.files['url'] ? req.files['url'][0].path : null;
    const coverImageFile = req.files['coverImage'] ? req.files['coverImage'][0].path : null;

    if (!songFile) return next(new Error("Audio file is required"))
    const newSong = new Song({ title,  genre, artist, duration, url: songFile, coverImage: coverImageFile });
    const savedSong = await newSong.save();

    await Artist.updateMany(
        { _id: { $in: artist } },
        { $push: { songs: savedSong._id } }
    );

    res.status(201).json({ message: "Song added successfully", song: newSong });
});



exports.getAllSongs = errorHandling(async (req, res) => {
    const songs = await Song.find().populate('artist');
    res.status(200).json(songs);
});
