const User = require("../models/User")

const bCrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const jwtSecret= process.env.JWT_SECRET

const genereteToken = (id)=>{
    return jwt.sign({id},jwtSecret,{
        expiresIn: "7d",
    });
};

//REgister user and sing in
const register = async(req,res)=>{
    res.send("Registro")
}

module.exports = {
    register,
}