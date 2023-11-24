"use strict"

const express = require('express');
const router = express.Router();
const dataHandler = require('./../controllers/data_handler');
const validateAdmin = require('./../controllers/router').validateAdmin;
const { generateUUID } = require('./../controllers/utils');

//VIDEOS
router.route('/')
    .post((req,res)=>{
        let newVideo = req.body;
        const expectedAttr = ['title', 'description', 'url', 'likes', 'uploadId', 'approved']; 
        const missingAttr = expectedAttr.filter(attr => !newVideo.hasOwnProperty(attr)); 

        if (missingAttr.length) {
            return res.status(400).send(`Missing attributes: ${missingAttr.join(', ')}`);
        }
        //Revisar que se auto generen los uuids
        newVideo.uuid = generateUUID();
        try{
            //Guardar el nuevo producto en el arreglo 
            dataHandler.createProduct(newVideo);
            res.status(201).send(`Product created: ${newVideo.title}`);
        }catch(e){
            res.status(500).send(`Error creating product: ${e.message}`);
        }
    })

router.route('/:id')
    .put((req, res) => {
        let id = req.params.id;
        let newVideo = req.body;
        let existingUser = dataHandler.getVideoById(id);
        if (!existingUser) {
            return res.status(404).send("User not found");
        }
        const expectedAttr = ['title', 'description', 'url', 'likes', 'uploadId', 'approved']; 
        const missingAttr = expectedAttr.filter(attr => !newVideo.hasOwnProperty(attr));
        if (missingAttr.length) {
            return res.status(400).send(`Missing attributes: ${missingAttr.join(', ')}`);
        }
        try{
            dataHandler.updateVideo(id, newVideo);
            res.status(200).send(`Video updated: ${newVideo.title}`);
        }catch(e){
            res.status(500).send(`Error updating video: ${e.message}`);
        }
    })
    .delete((req, res) => {
        let id = req.params.id;

        let existingVideo = dataHandler.getVideoById(id);
        if (!existingVideo) {
            return res.status(404).send("Video not found");
        }
        try{
            dataHandler.deleteVideo(id);
            res.status(200).send(`Video deleted`);
        }catch(e){
            res.status(500).send(`Error deleting video: ${e.message}`);
        }
    })

    module.exports = router;

//USERS