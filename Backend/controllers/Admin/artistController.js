const { createError, errorHandling } = require("../../helper/errorMiddleware")
const Artist = require("../../models/Artist")

exports.addArtist = errorHandling(async (req, res, next) => {
    const { name } = req.body
    const image = req.file?.path || '';

    if (!name) return next(createError(400,'Artist name is required' ))
    const existing = await Artist.findOne({ name: { $regex: `^${name}$`, $options: 'i' } });
    if (existing) {
        return next(createError(400, 'Artist with this name already exists.'));
    }

    const newArtist = new Artist({ name, image })
    const savedArtist = await newArtist.save()
    res.status(201).json(savedArtist)
})



exports.getArtist = errorHandling(async (req, res) => {
    const artists = await Artist.find().populate('songs')
    res.status(200).json(artists);
})



exports.getSingleArtist = errorHandling( async (req, res, next) => {
    const { artistId } = req.params;
    const artist = await Artist.findById( artistId ).populate('songs')
    if ( !artist ) return next(createError(404, "Artist not found"))

    res.status(200).json( artist )
})



exports.updateArtist = errorHandling( async (req, res, next) => {
    const { name } = req.body
    const image = req.file?.path || ''
    const { artistId } = req.params

    const updatedData = { name };
    if (image) updatedData.image = image;

    const artist = await Artist.findByIdAndUpdate( artistId, updatedData, { new: true } )
    if ( !artist ) return next(createError(404, "Artist not found"))

    res.status(200).json({ message : "Artist updated successfully",artist })

})



exports.deleteArtist = errorHandling(async (req, res, next) => {
    const { artistId } = req.params;

    const artist = await Artist.findByIdAndDelete( artistId )
    if (!artist) return next(createError(404, "Artist not found"))
    res.status(200).json(artist)
})