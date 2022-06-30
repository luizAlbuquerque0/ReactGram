const moongose = require("mongoose")
const {Schema} = moongose

const userSchema = new Schema({
    name : String,
    email: String,
    password: String,
    profileImage: String,
    bio: String,
},{
    timestamps: true
});

const user = moongose.model("User", userSchema);

module.exports = user;