"use strict";

const mongoose = require('mongoose');

let MongoDB = 'mongodb://127.0.0.1:27017/YoutubeClone'
//let option = { useNewUrlParser: true, useUnifiedTopology: true};

mongoose.connect(MongoDB);

//Esquema de usuario
let userSchema = mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
    /*avatar:{
        type: String,
        required: true
    },
    admin:{
        type: Number,
        required: true
    },
    videos:{
        type: String,
        required: true
    }, 
    likes:{
        type: Number,
        required: true
    }*/
});

let User = mongoose.model('user',userSchema);
let newUser = {
    email: "yochabel.martinez@iteso.mx",
    password: "yochi123"
    /*avatar: "image.jpg",
    admin: 1,
    videos: "video1.mp4",
    likes: 10*/
}
let user = User(newUser);

user.save()
    .then(doc => console.log(doc))
    .catch(err => console.log(err));
