const express = require("express")
const router = express.Router()

//Controlers
const {register, login, getCurrentUser} = require("../controllers/UserController")

//middlewares
const validate = require("../middleware/handleValidation")
const {userCreateValidation, loginValidation} = require("../middleware/userValidations")
const authGuard = require("../middleware/authGaurd")


//Routes
router.post("/register",userCreateValidation(), validate, register)
router.post("/login",loginValidation(), validate, login)
router.get("/profile", authGuard, getCurrentUser)

module.exports = router;