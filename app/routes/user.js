"use strict"

const fs = require('fs');
const express = require('express');
const router = express.Router();

const dataHandler = require('../controllers/data_handler'); 
//const { filterUsers } = dataHandler;
const User = require('../data/Mongoose/user');


//GET USER
router.route('/')
.get(async (req, res) => {
    let query = req.query.filter;

    try {
        let users;
        if (query === undefined) {
            users = await User.find({});
        } else {
            users = await User.find({ email: new RegExp(query, 'i') }); 
        }

        // Transforma los videos al formato deseado
        const formattedUsers = users.map(user => {
            return {
                email: user.email,
                password: user.password
            };
        });
         // Guarda los videos en un archivo JSON
         fs.writeFileSync('app/data/users.json', JSON.stringify(formattedUsers, null, 4)); 

         res.status(200).json(formattedUsers);
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
.get((req, res) => {
    const userId = req.params.id;

    // Lee el contenido actual del archivo 'users.json'
    try {
        const rawData = fs.readFileSync('users.json', 'utf-8');
        const users = JSON.parse(rawData);

        // Busca el usuario con el _id correspondiente
        const foundUser = users.find(user => user._id === userId);

        if (foundUser) {
            res.status(200).json(foundUser);
        } else {
            res.status(404).send(`User with _id: ${userId} not found`);
        }
    } catch (e) {
        console.error(e);
        res.status(500).send('Internal Server Error');
    }
});

    module.exports = router;
    exports.getUsers = this.getUsers;
