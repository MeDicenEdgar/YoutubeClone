"use strict"

const express = require('express');
const router = express.Router();
const dataHandler = require('../controllers/data_handler');
const validateAdmin = require('../controllers/router').validateAdmin;
const { generateUID } = require('../controllers/utils');

//USERS
router.route('/')
    .post((req,res)=>{
        let newUser = req.body;
        const expectedAttr = ['email', 'password', 'avatar', 'admin', 'videos', 'likes']; 
        const missingAttr = expectedAttr.filter(attr => !newUser.hasOwnProperty(attr)); 

        if (missingAttr.length) {
            return res.status(400).send(`Missing attributes: ${missingAttr.join(', ')}`);
        }
        //Revisar que se auto generen los uuids
        newUser.uuid = generateUID();
        try{
            //Guardar el nuevo producto en el arreglo 
            dataHandler.createUser(newUser);
            res.status(201).send(`User created: ${newUser.title}`);
        }catch(e){
            res.status(500).send(`Error creating user: ${e.message}`);
        }
    })

router.route('/:id')
    .put((req, res) => {
        let id = req.params.id;
        let newUser = req.body;
        let existingUser = dataHandler.getUserById(id);

        //Comprobar si el usuario existe
        if (!existingUser) {
            return res.status(404).send("User not found");
        }
        //Asegurarse de que todos los atributos esperados estén presentes
        const expectedAttr = ['email', 'password']; 
        const missingAttr = expectedAttr.filter(attr => !newUser.hasOwnProperty(attr));
        if (missingAttr.length) {
            return res.status(400).send(`Missing attributes: ${missingAttr.join(', ')}`);
        }
        try {
            //Actualizar el usuario
            dataHandler.updateUser(id, newUser);
            //Guardar los cambios en users.json
            dataHandler.saveChanges();
            res.status(200).send(`User updated: ${newUser.title}`);
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