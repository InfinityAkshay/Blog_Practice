const mongoose = require('mongoose');
const Schema = mongoose.Schema
const Blog = require('blog.js');

const userSchema = new Schema({
    username:{
        type: String,
    },
    password:{
        type: String,
    },
},
{
    timestamps: true
})

const User = mongoose.model("User", userSchema)
module.exports = User;