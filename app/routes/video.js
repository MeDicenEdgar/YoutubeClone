"use strict"
const fs = require('fs');
const express = require('express');
const router = express.Router();
const Video = require('../data/Mongoose/video');

const dataHandler = require('../controllers/data_handler');
//const { filterVideos } = dataHandler;

//GET VIDEO
router.route('/')
    .get(async (req, res) => {
        let query = req.query.filter;

        try {
            let videos;
            if (query === undefined) {
                videos = await Video.find({});
            } else {
                videos = await Video.find({ title: new RegExp(query, 'i') }); 
            }

            // Transforma los videos al formato deseado
            const formattedVideos = videos.map(video => {
                return {
                    _id: video._id,
                    title: video.title,
                    description: video.description,
                    url: video.url,
                    likes: video.likes,
                    __v: video.__v
                };
            });
            // Guarda los videos en un archivo JSON
            fs.writeFileSync('app/data/videos.json', JSON.stringify(formattedVideos, null, 4)); 

            res.status(200).json(formattedVideos);
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
