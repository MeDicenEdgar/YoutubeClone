"use strict"
const express = require('express');
const router = express.Router();

//GET VIDEO
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

//POST VIDEO
router.route('/video')
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
        res.json(videos);
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

//GET USER
router.route('/')
    .get((req,res)=> {
        let query = req.query.filter;
        let users;
        
        if(query === undefined){
            try{
                users = dataHandler.getUsers(query);
            } catch(e){
                res.status(400).send("ERROR");
            }
            res.status(200).json(videos);
        }else{
            //Lista filtrada de usuarios
            try {
                users = dataHandler.filterUsers(query);
                res.status(200).json(users);
            } catch (e) {
                res.status(400).send("ERROR");
            }
        }
    })

//POST USER
router.route('/video')
    .post((req,res)=> {
        let proxies = req.body;
        let newUser = [];

        if(!Array.isArray(proxies)){
            res.status(400).send("Error, body must be of type array");
        }
        for(let proxy of proxies){
            let newUser = dataHandler.getUserById(proxy.uuid);
            if(newUser != undefined){
                videos.push(newUser);
            }else{
                res.status(404).send(`User with UUID: ${proxy.uuid} not found`); 
            }
        }
        res.json(videos);
    })

//GET ID USER
router.route('/:id')
    .get((req,res)=> {
        let uuid = req.params.id;
        let  newUser = dataHandler.getUserById(uuid);
        
        if(newUser != undefined){
            res.status(200).json(newUser)
        }else{
            res.status(404).send(`Product with UUID: ${uuid} not found`); 
        } 
    })