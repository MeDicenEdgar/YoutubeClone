"use strict";

const mongoose = require('mongoose');

let MongoDB = 'mongodb://127.0.0.1:27017/YoutubeClone'
//let option = { useNewUrlParser: true, useUnifiedTopology: true};

mongoose.connect(MongoDB);

//Esquema de usuario
let videoSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: false
    },
    url:{
        type: String,
        required: true
    },
    likes:{
        type: Number,
        required: true
    }/*,
    uploadId:{
        type: String,
        required: true
    },
    approved:{
        type: Number,
        required: true
    }*/
});

let Video = mongoose.model('video',videoSchema);
let newVideo = {
    title: "video1",
    description: "This is video1",
    url: "www.video1.com",
    likes: 0
}
let video = Video(newVideo);

video.save()
    .then(doc => console.log(doc))
    .catch(err => console.log(err));
