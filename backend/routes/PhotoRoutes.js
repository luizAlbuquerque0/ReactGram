const express = require("express");
const router = express.Router();

//Controllers
const {
    insertPhoto,
    deletePhoto,
    getAllPhotos,
    getUserPhotos,
} = require("../controllers/PhotoController");

//Middlewares
const { photoInsertionValidation } = require("../middleware/photoValidation");
const authGuard = require("../middleware/authGaurd");
const validate = require("../middleware/handleValidation");
const { imageUpload } = require("../middleware/imageUpload");

//Routes
router.post(
    "/",
    authGuard,
    imageUpload.single("image"),
    photoInsertionValidation(),
    validate,
    insertPhoto,
);

router.delete("/:id", authGuard, deletePhoto);
router.get("/", authGuard, getAllPhotos);
router.get("/user/:id", authGuard, getUserPhotos);

module.exports = router;
