const errorHandling = require("../../helper/errorMiddleware");
const User = require("../../models/User")

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};



exports.toggleBlockUser = errorHandling(async (req, res, next) => {
    const { isActive } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { isActive },
        { new: true }
    );
    if (!updatedUser) {
        return next(new Error("User not found"));
    }
    res.status(200).json(updatedUser);
});