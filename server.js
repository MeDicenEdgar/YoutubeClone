"use strict";

const cors = require('cors');
const express = require('express');
const app = express();
const port = 3000;
const User = require('./app/data/Mongoose/user');

app.use(cors());
app.use(express.json());

const VideoJson = '[{}]';
const video = JSON.parse(VideoJson);

const {router} = require('./app/controllers/router'); 
app.use('/', router);


/*
const adminVideoRouter = require('../routes/admin_video');
app.use('/admin', adminVideoRouter);*/

app.route('/video')
    .get((req, res) => {
        res.status(200).json(video);
    });

app.post('/adduser', (req, res) => {
    const newUser = new User({
        email: req.body.email,
        password: req.body.password,
        avatar: req.body.avatar,
        admin: req.body.admin,
        videos: req.body.videos,
        likes: req.body.likes
    });
    newUser.save()
        .then(user => {
            console.log(user);
            res.status(201).send('Usuario agregado con éxito');
        })
            .catch(err => {
                console.log(err);
                res.status(500).send('Error al agregar usuario' + err.message);
        })
});

app.route('/video/:id')
    .get((req, res) => {
        let uuid = req.params.id;
        let foundVideo = video.find(video => video.uuid == uuid);

        if (foundVideo != undefined) {
            res.status(200).json(foundVideo);
        } else {
            res.status(404)
                .type('text/plain')
                .send(`No video with ID ${uuid} found`);
        }
    });

app.listen(port, () => {
    console.log(`YoutubeClone app listening on port ${port}!`);
});
