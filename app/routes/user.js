"use strict"

const express = require('express');
const router = express.Router();

const dataHandler = require('../controllers/data_handler'); 
//const { filterUsers } = dataHandler;

//GET USER
router.route('/')
    .get((req, res) => {
        let query = req.query.filter;
        let users; 

        try {
            if(query === undefined){
                users = dataHandler.getUsers();
            } else {
                users = filterUsers(dataHandler.getUsers(), query);
            }
            res.status(200).json(users);
        } catch (e) {
            console.error(e); 
            res.status(400).send("ERROR: " + e.message); 
        }
    });

//POST USER
router.route('/')
    .post((req,res)=> {
        let proxies = req.body;
        let newUser = [];

        if(!Array.isArray(proxies)){
            res.status(400).send("Error, body must be of type array");
        }
        for(let proxy of proxies){
            newUser = dataHandler.getUserById(proxy.uuid);
            if(newUser != undefined){
                videos.push(newUser);
            }else{
                res.status(404).send(`User with UUID: ${proxy.uuid} not found`); 
            }
        }
        res.json(users);
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

    module.exports = router;
    exports.getUsers = this.getUsers;
