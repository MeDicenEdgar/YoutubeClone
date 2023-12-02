"use strict"

const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const router = express.Router();
const dataHandler = require('../controllers/data_handler');
const { validateAdmin } = require('../controllers/router');
const { generateVideoID } = require('../controllers/utils');


//VIDEOS
/*router.route('/')
    .post('/uploadVideo', async (req,res)=>{
        let newVideo = req.body;
        const expectedAttr = ['title', 'description', 'url','userId']; 
        const missingAttr = expectedAttr.filter(attr => !newVideo.hasOwnProperty(attr)); 

        if (missingAttr.length) {
            return res.status(400).send(`Missing attributes: ${missingAttr.join(', ')}`);
        }
        //newVideo.uuid = generateVideoID();
        try{
            //Guardar el nuevo producto en el arreglo 
            dataHandler.createVideo(newVideo);
            await newVideo.save();
            res.status(201).send(`video created: ${newVideo.title}`);
        }catch(e){
            res.status(500).send(`Error creating video: ${e.message}`);
        }
    })
*/
router.route('/:id')
    .put((req, res) => {
        let id = req.params.id;
        let newVideo = req.body;
        let existingVideo = dataHandler.getVideoById(id);
        if (!existingVideo) {
            return res.status(404).send("Video not found");
        }
        const expectedAttr = ['title', 'description', 'url', 'likes', 'uploadId', 'approved']; 
        const missingAttr = expectedAttr.filter(attr => !newVideo.hasOwnProperty(attr));
        if (missingAttr.length) {
            return res.status(400).send(`Missing attributes: ${missingAttr.join(', ')}`);
        }
        try{
            //Actualizar el usuario
            dataHandler.updateVideo(id, newVideo);
            //Guardar los cambios en users.json
            dataHandler.saveChanges();
            res.status(200).send(`Video updated: ${newVideo.title}`);
        } catch(e) {
            // Manejar cualquier error durante la actualización
            res.status(500).send(`Error updating user: ${e.message}`);
        }
    })
    .delete((req, res) => {
        let id = req.params.id;

        let existingUser = dataHandler.getUserById(id);
        if (!existingUser) {
            return res.status(404).send("User not found");
        }
        try{
            dataHandler.deleteUser(id);
            res.status(200).send(`User deleted`);
        }catch(e){
            res.status(500).send(`Error deleting User`);
        }
    })


    module.exports = router;
