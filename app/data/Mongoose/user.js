"use strict";

const mongoose = require('mongoose');
/*const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let privateKey = process.env.TOKEN_KEY;*/
//let option = { useNewUrlParser: true, useUnifiedTopology: true};

let MongoDB = 'mongodb://127.0.0.1:27017/YoutubeClone'

mongoose.connect(MongoDB);

//Esquema de usuario
let userSchema = mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    admin:{
        type: Number,
        required: true
    }
    /*avatar:{
        type: String,
        required: true
    },
    ,
    videos:{
        type: String,
        required: true
    }, 
    likes:{
        type: Number,
        required: true
    }*/
});

/*userSchema.pre('save', function(next) {
    let user = this;
    user.password = bcrypt.hashSync(user.password, 10);
    next();
})
userSchema.methods.generateToken = function(password) {
    let user = this;
    let payload = {_id: user._id, role: user.role};
    let options = { expiresIn: 60 * 60 }
    if (bcrypt.compareSync(password, user.password)) {
        try {
            user.token = jwt.sign(payload, privateKey, options);
            return user.token;
        } catch (err) {
            console.log(err);
        }
    }
}*/

let User = mongoose.model('user',userSchema);

module.exports = User;