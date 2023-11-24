"use strict"

const express = require('express');
const router = express.Router();
const videosRouter = require('./../routes/videos');
const adminVideosRouter = require('./../routes/admin_videos');
router.use('/videos', videosRouter);
router.use('/admin/videos', validateAdmin, adminVideosRouter);
const path = require('path'); 

router.get(['/', '/home'], (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'home.html'));
});

router.get('/user', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'Usuario.html'));
});

router.get('/VideoMod', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'VideoMod.html'));
});

//Middleware
function validateAdmin(req, res, next){
    let adminToken = req.get('x-auth');
    console.log('x-auth header:', adminToken);
    if(adminToken == undefined || adminToken !== "admin"){
        res.status(403).send("Unauthorized access, no administrator privileges");
    }else{
        next();
    }
}

// Exportar el router
module.exports = router;