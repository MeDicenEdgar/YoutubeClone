"use strict"

const express = require('express');
const router = express.Router();
const videoRouter = require('../routes/video');
const adminVideoRouter = require('../routes/admin_video');
const userRouter = require('../routes/user');
const adminUserRouter = require('../routes/admin_user');

router.use('/video', videoRouter);
router.use('/admin/video', validateAdmin, adminVideoRouter);
router.use('/admin/user', validateAdmin, adminUserRouter);
router.use('/user', userRouter);

const path = require('path'); 

/*router.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'home.html'));
});

router.get('/user', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'Usuario.html'));
});

router.get('/VideoMod', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'VideoMod.html'));
});*/

//Middleware
function validateAdmin(req, res, next){
    let adminToken = req.get('x-auth');
    console.log('x-auth header:', adminToken);
    if(adminToken == undefined || adminToken !== "admin"){
        console.log('Unauthorized access');
        res.status(403).send("Unauthorized access, no administrator privileges");
    }else{
        next();
    }
}


    // Exportar el router
    module.exports = {
        router,
        validateAdmin
    };
    