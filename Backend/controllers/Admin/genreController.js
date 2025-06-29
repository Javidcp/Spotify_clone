const GenrePlaylist = require("../../models/GenrePlaylist")
const { errorHandling, createError } = require("../../helper/errorMiddleware")

exports.createGenrePlaylist = errorHandling( async (req, res, next) => {
    const { name, description } = req.body;
    const image = req.file?.path;

    if (!name || !image) {
        return next(createError(400, "Name and image are required"));
    }
    const existing = await GenrePlaylist.findOne({name: { $regex: `^${name.trim()}$`, $options: "i" }});
    if (existing) {
        return next(createError(409, `Playlist "${name}" already exists`));
    }

    const newPlaylist = new GenrePlaylist({
        name: name.trim(),
        description: description || "",
        image,
        songs: [],
    });
    await newPlaylist.save();
    

    res.status(201).json({
        success: true,
        message: `Playlist "${name}" created successfully`,
        playlist: newPlaylist,
    });
})  



exports.getAllGenrePlaylists = errorHandling(async (req, res) => {
    const playlists = await GenrePlaylist.find().sort({ createdAt: -1 });
    res.status(200).json({ playlists });
});



exports.getGenres = errorHandling(async (req, res) => {
    const genres = await GenrePlaylist.find({}, "name");
    res.status(200).json(genres);
});



exports.getGenrePlaylist = errorHandling( async (req, res, next) => {
    const genre = await GenrePlaylist.findById(req.params.id).populate({path: 'songs', populate: [{ path: 'artist', model: 'Artist'}, { path: 'genre', model: 'GenrePlaylist' }]})
    if (!genre) return next(createError(404, "Genre not found"))
    res.json(genre);
})



exports.deleteGenre = errorHandling(async (req, res, next) => {
    const { genreId } = req.params;

    const genre = await GenrePlaylist.findByIdAndDelete( genreId )
    if (!genre) return next(createError(404, "Artist not found"))
    res.status(200).json(genre)
})