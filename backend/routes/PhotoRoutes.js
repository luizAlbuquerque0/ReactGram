const express = require("express");
const router = express.Router();

//Controllers
const { insertPhoto } = require("../controllers/PhotoController");

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

module.exports = router;
