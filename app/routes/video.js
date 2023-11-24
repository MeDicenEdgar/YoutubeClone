"use strict"
const express = require('express');
const router = express.Router();

//GET
router.route('/')
    .get((req,res)=> {
        let query = req.query.filter;
        let videos;
        
        if(query === undefined){
            try{
                videos = dataHandler.getVideos(query);
            } catch(e){
                res.status(400).send("ERROR");
            }
            res.status(200).json(videos);
        }else{
            //Lista filtrada de videos
            try {
                videos = dataHandler.filterVideos(query);
                res.status(200).json(products);
            } catch (e) {
                res.status(400).send("ERROR");
            }
        }
    })

//GET ID
router.route('/:id')
    .get((req,res)=> {
        let uuid = req.params.id;
        let  newVideo = dataHandler.getProductById(uuid);
        
        if( newVideo != undefined){
            res.status(200).json( newVideo)
        }else{
            res.status(404).send(`Product with UUID: ${uuid} not found`); 
        } 
    })
