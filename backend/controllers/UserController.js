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
    
    const {name, email,password} = req.body

    const user = await User.findOne({email});
    if (user){
        res.status(422).json({errors: ["Por favor, utilizar outro email"]})
        return
    }

    //password hash
    const salt = await bCrypt.genSalt()
    const passwordHash = await bCrypt.hash(password, salt)

    //create user
    const newUser = await User.create({
        name,
        email,
        password: passwordHash,
    })

    if(!newUser){
        res.status(422).json({errors:["Houve um erro, por favor tente novamente mais tarde"]});
        return
    }

    //if user was created successfullu, return the token
    res.status(201).json({
        _id: newUser._id,
        token: genereteToken(newUser._id)
    });
}

//sing user in
const login = async(req, res)=>{
    const {email, password} = req.body

    const user = await User.findOne({email})


    if(!user){
        res.status(404).json({errors:["Usuário não encontrado"]});
        return 
    }

    if(!(await bCrypt.compare(password, user.password))){
        res.status(422).json({errors:["Senha inválida."]})
    }

    //Return user with token
    res.status(201).json({
        _id: user._id,
        profileImage: user.profileImage,
        token: genereteToken(user._id),
    });


}

module.exports = {
    register,
    login,
}