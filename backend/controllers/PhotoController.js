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
        return;
    }

    res.send(newPhoto);
};

//Remove a photo from db
const deletePhoto = async (req, res) => {
    const { id } = req.params;

    const reqUser = req.user;

    try {
        const Photo = await photo.findById(mongoose.Types.ObjectId(id));

        if (!Photo) {
            res.status(404).json({ erros: ["Foto não encontrada"] });
            return;
        }

        //Check if photo belongs to user
        if (!Photo.userId.equals(reqUser._id)) {
            res.status(404).json({
                erros: [
                    "Ocorreu um erro, por favor tente novamente mais tarde",
                ],
            });
        }

        await photo.findByIdAndDelete(Photo._id);

        res.status(200).json({
            id: Photo._id,
            message: "Foto excluida com sucesso.",
        });
    } catch (error) {
        res.status(404).json({ erros: ["Foto não encontrada"] });
        return;
    }
};

//Get all photos
const getAllPhotos = async (req, res) => {
    const photos = await photo
        .find({})
        .sort([["createdAt", -1]])
        .exec();

    res.status(200).json(photos);
};

//Get user photos
const getUserPhotos = async (req, res) => {
    const { id } = req.params;

    const photos = await photo
        .find({ userId: id })
        .sort([["createdAd", -1]])
        .exec();

    res.status(200).json(photos);
};

//Get photo by ID
const getPhotoById = async (req, res) => {
    const { id } = req.params;

    const Photo = await photo.findById(mongoose.Types.ObjectId(id));

    //Check if photo exists
    if (!Photo) {
        res.status(404).json({ erros: ["Foto não encontrada"] });
        return;
    }

    res.status(200).json(Photo);
};

//Update a photo
const updatePhoto = async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const reqUser = req.user;

    const Photo = await photo.findById(id);

    if (!Photo) {
        res.status(404).json({ erros: ["Foto não encontrada"] });
    }

    //Check if photo belongs to user
    if (!Photo.userId.equals(reqUser._id)) {
        res.status(404).json({
            erros: ["Ocorreu um erro, por favor tente novamente mais tarde"],
        });
        return;
    }

    if (title) {
        Photo.title = title;
    }

    await Photo.save();

    res.status(200).json({ Photo, mensage: "Foto atualizada com sucesso" });
};

module.exports = {
    insertPhoto,
    deletePhoto,
    getAllPhotos,
    getUserPhotos,
    getPhotoById,
    updatePhoto,
};
