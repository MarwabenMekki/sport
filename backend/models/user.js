// import mongoose module
const mongoose = require("mongoose");

// create user schema
const userSchema = mongoose.Schema({
    firstName:String,
    lastName:String,
    email: String,
    password: String,
    role: String,
    avatar: String
});

// create user model
const user= mongoose.model("User",userSchema);

// export user
module.exports= user;

