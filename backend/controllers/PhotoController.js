const Photo = require("../models/Photo");
const mongoose = require("mongoose");
const User = require("../models/User");
const photo = require("../models/Photo");

//Insert a photo, with an user related to it
const insertPhoto = async (req, res) => {
    const { title } = req.body;
    const image = req.file.filename;

    const reqUser = req.user;

    const user = await User.findById(reqUser._id);

    const newPhoto = await photo.create({
        image,
        title,
        userId: user._id,
        userName: user.name,
    });

    if (!newPhoto) {
        res.status(422).json({
            erros: ["Houve um problema, por favor tente novamente mais tarde"],
        });
    }

    res.send(newPhoto);
};

module.exports = { insertPhoto };
