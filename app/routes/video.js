"use strict"
const express = require('express');
const router = express.Router();

const dataHandler = require('../controllers/data_handler');
//const { filterVideos } = dataHandler;

//GET VIDEO
router.route('/')
    .get((req, res) => {
        let query = req.query.filter;
        let videos;

        try {
            if(query === undefined){
                videos = dataHandler.getVideos();
            } else {
                videos = filterVideos(dataHandler.getVideos(), query);
            }
            res.status(200).json(videos);
        } catch (e) {
            console.error(e);
            res.status(400).send("ERROR: " + e.message);
        }
    });


//POST VIDEO
router.route('/')
    .post((req,res)=> {
        let proxies = req.body;
        let newVideo = [];

        if(!Array.isArray(proxies)){
            res.status(400).send("Error, body must be of type array");
        }
        for(let proxy of proxies){
            let newVideo = dataHandler.getVideoById(proxy.uuid);
            if(newVideo != undefined){
                videos.push(newVideo);
            }else{
                res.status(404).send(`Video with UUID: ${proxy.uuid} not found`); 
            }
        }
        res.json(newVideo);
    })

//GET ID VIDEO
router.route('/:id')
    .get((req,res)=> {
        let uuid = req.params.id;
        let  newVideo = dataHandler.getVideoById(uuid);
        
        if( newVideo != undefined){
            res.status(200).json(newVideo)
        }else{
            res.status(404).send(`Product with UUID: ${uuid} not found`); 
        } 
    })

    module.exports = router;
