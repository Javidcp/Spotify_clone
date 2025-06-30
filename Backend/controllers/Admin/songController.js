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



exports.deleteSong = errorHandling(async (req, res, next) => {
    const { songId } = req.params;
    const song = await Song.findByIdAndDelete( songId )
    if (!song) return next(createError(404, "Songs not found"))
    res.status(200).json(song)
})



exports.updateSong = errorHandling(async (req, res, next) => {
    const { title, duration, playCount, genre } = req.body;
    let artist = req.body.artist;

    if (!Array.isArray(artist)) {
        artist = artist?.split(',').map((id) => id.trim()).filter(Boolean);
    }

    const song = await Song.findById(req.params.id);
    if (!song) return next(createError(404, 'Song not found'));

    song.title = title || song.title;
    song.duration = duration || song.duration;
    song.artist = artist || song.artist;

    if (genre) {
        const genreDoc = await GenrePlaylist.findOne({ name: genre });
        if (genreDoc) {
            song.genre = genreDoc._id;
        } else {
            return next(createError(400, 'Genre not found'));
        }
    }

    if (req.files?.coverImage?.[0]) {
        song.coverImage = `/uploads/${req.files.coverImage[0].filename}`;
    }

    if (req.files?.url?.[0]) {
        song.url = `/uploads/${req.files.url[0].filename}`;
    }

    await song.save();

    const populatedSong = await Song.findById(song._id)
        .populate('artist', 'name')
        .populate('genre', 'name');

    res.status(200).json(populatedSong);
});




exports.getSingleSong = errorHandling( async (req, res, next) => {
    const { songId } = req.params;
    const song = await Song.findById( songId ).populate('artist').populate("genre")

    if ( !song ) return next(createError(404, "Song not found"))

    res.status(200).json( song )
})