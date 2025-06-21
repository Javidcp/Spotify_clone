const errorHandling = require("../../helper/errorMiddleware")
const Artist = require("../../models/Artist")

exports.addArtist = errorHandling(async (req, res, next) => {
    const { name, followers } = req.body
    const image = req.file?.path || '';

    if (!name) return next(new Error('Artist name is required' ))

    const newArtist = new Artist({
        name,
        image,
        followers
    })
    const savedArtist = await newArtist.save()

    res.status(201).json(savedArtist)
})

exports.getArtist = errorHandling(async (req, res) => {
    const artists = await Artist.find().populate('songs')
    res.status(200).json(artists);
})