"use strict";

const fs = require('fs');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const User = require('./app/data/Mongoose/user');
const Video = require('./app/data/Mongoose/video');
const dataHandler = require('./app/controllers/data_handler');

mongoose.connect('mongodb://127.0.0.1:27017/YoutubeClone');

app.use(cors());
app.use(express.json());

const VideoJson = '[{}]';
const video = JSON.parse(VideoJson);

const {router} = require('./app/controllers/router'); 
app.use('/', router);


/*
const adminVideoRouter = require('../routes/admin_video');
app.use('/admin', adminVideoRouter);*/

app.get('/video', async (req, res) => {
    try {
        const videos = await Video.find({}); // Encuentra todos los videos
        res.status(200).json(videos);
    } catch (error) {
        res.status(500).send('Error al obtener los videos: ' + error.message);
    }
});
app.get('/user', async (req, res) => {
    try {
        const users = await User.find({}); 
        const data = JSON.stringify(videos, null, 2);
        fs.writeFile('./app/data/users.json', data, (err) => {
            if (err) {
                throw err;
            }
            console.log('Los usuarios han sido guardados en videos.json');
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send('Error al obtener los usuarios: ' + error.message);
    }
});

app.get('/getvideos', async (req, res) => {
    try {
        const videos = await Video.find({});
        const data = JSON.stringify(videos, null, 2);

        fs.writeFile('./app/data/videos.json', data, (err) => {
            if (err) {
                throw err;
            }
            console.log('Los videos han sido guardados en videos.json');
        });
        res.status(200).json(videos);
    } catch (error) {
        res.status(500).send('Error al obtener los videos: ' + error.message);
    }
});


app.post('/login', (req, res) => {
    const { email, password } = req.body;

    fs.readFile(__dirname + '/app/data/users.json', (err, data) => {
        if (err) {
            res.status(500).send('Error al leer el archivo: ' + err.message);
            return;
        }

        try {
            const users = JSON.parse(data); // Directamente un arreglo

            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                res.json(user);
            } else {
                res.status(401).send('Credenciales incorrectas');
            }
        } catch (parseError) {
            res.status(500).send('Error al procesar el archivo: ' + parseError.message);
        }
    });
});

app.post('/registerUser', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save(); // Asumiendo que esto es una operación de base de datos

        // Leer el archivo y agregar el nuevo usuario
        fs.readFile('./app/data/users.json', (err, data) => {
            if (err) {
                res.status(500).send('Error al leer el archivo: ' + err.message);
                return;
            }
            let users = JSON.parse(data);
            users.push(newUser);

            // Escribir de nuevo en el archivo
            fs.writeFile('users.json', JSON.stringify(users, null, 2), (err) => {
                if (err) {
                    res.status(500).send('Error al registrar el usuario en el archivo: ' + err.message);
                    return;
                }
                res.status(201).json(newUser);
            });
        });
    } catch (error) {
        res.status(400).send('Error registering user: ' + error.message);
    }
});
app.post('/registerVideo', async (req, res) => {
    try {
        const newVideo = new Video(req.body);
        await newVideo.save();
        res.status(201).json(newVideo);
    } catch (error) {
        res.status(400).send('Error registering video: ' + error.message);
    }
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

app.put('/admin/user/:id', async (req, res) => {
    const id = req.params.id;
    const updatedUserData = req.body;
        
    try {
        // Encuentra el usuario por ID
        const user = await User.findById(id);
    
        // Si no se encuentra el usuario, envía un 404
        if (!user) {
            return res.status(404).send('User not found');
        }
    
        // Actualiza los campos del usuario con los nuevos datos
        user.email = updatedUserData.email || user.email;
        user.password = updatedUserData.password || user.password;
        // Añade los demás campos que quieras actualizar aquí
            
        // Guarda los cambios en la base de datos
        const updatedUser = await user.save();
    
        // Envía la respuesta con el usuario actualizado
        res.status(200).json(updatedUser);
    } catch (error) {
        // Manejar cualquier error durante la actualización
        console.error('Error updating user:', error);
        res.status(500).send(`Error updating user: ${error.message}`);
    }
});
app.put('/admin/video/:id', async (req, res) => {
    const id = req.params.id;
    const updatedVideoData = req.body;
        
    try {
        // Encuentra el usuario por ID
        const video = await Video.findById(id);
    
        // Si no se encuentra el usuario, envía un 404
        if (!user) {
            return res.status(404).send('User not found');
        }
    
        // Actualiza los campos del usuario con los nuevos datos
        video.title = updatedVideoData.title || video.title;
        video.description = updatedVideoData.description || video.description;
        video.url = updatedVideoData.url || video.url;
        video.likes = updatedVideoData.likes || video.likes;
        video.uploadId = updatedVideoData.uploadId || updatedVideoData.uploadId;
        video.approved = updatedVideoData.approved || video.approved;
        
        // Guarda los cambios en la base de datos
        const updatedVideo = await user.save();
    
        // Envía la respuesta con el usuario actualizado
        res.status(200).json(updatedVideo);
    } catch (error) {
        // Manejar cualquier error durante la actualización
        console.error('Error updating video:', error);
        res.status(500).send(`Error updating video: ${error.message}`);
    }
});
app.delete('/admin/user/:id', async (req, res) => {
    const id = req.params.id;
        
    try {
        // Encuentra el usuario por ID y elimínalo
        const deletedUser = await User.findOneAndDelete(id);
    
        // Si no se encuentra el usuario, envía un 404
        if (!deletedUser) {
            return res.status(404).send('User not found');
        }
    
        // Envía la respuesta con el usuario eliminado
        res.status(200).send('User deleted');
    } catch (error) {
        // Manejar cualquier error durante la eliminación
        console.error('Error deleting user:', error);
        res.status(500).send(`Error deleting user: ${error.message}`);
    }
});
app.delete('/video/:id', async (req, res) => {
    const id = req.params.id;
        
    try {
        // Encuentra el video por su ObjectId válido y elimínalo
        const deletedVideo = await Video.findOneAndDelete({ _id: id });
    
        // Si no se encuentra el video, envía un 404
        if (!deletedVideo) {
            return res.status(404).send('Video not found');
        }
    
        // Envía la respuesta con el video eliminado
        res.status(200).send('Video deleted');
    } catch (error) {
        // Manejar cualquier error durante la eliminación
        console.error('Error deleting video:', error);
        res.status(500).send(`Error deleting video: ${error.message}`);
    }
});
app.post('/uploadVideo', async (req, res) => {
    let newVideoData = req.body;
    const expectedAttr = ['title', 'description', 'url', 'userId'];
    const missingAttr = expectedAttr.filter(attr => !newVideoData.hasOwnProperty(attr)); 
    newVideoData.likes = 0;
    newVideoData.uploadId = Date.now();
    newVideoData.approved = 0;

    if (missingAttr.length) {
        return res.status(400).send(`Missing attributes: ${missingAttr.join(', ')}`);
    }

    try {
        // Crear una instancia del modelo Video y guardar
        let video = new Video(newVideoData);
        let savedVideo = await video.save();
        res.status(201).json({ message: `Video created: ${savedVideo.title}` });
    } catch (e) {
        console.error(e);
        res.status(500).send(`Error creating video: ${e.message}`);
    }
});


    

app.listen(port, () => {
    console.log(`YoutubeClone app listening on port ${port}!`);
});
