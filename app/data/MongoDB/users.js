"use strict";

const {MongoClient} = require('mongodb');

let mongoURl = "mongodb://127.0.0.1:27017"
let options = {
    useNewUrlParser: true
};
MongoClient.connect(mongoUrl, options, (err,client)=>{
    if(err) throw err;
        console.log("Connected to MongoDB Server");
        const db = client.db('YoutubeClone');
        db.createCollection('users', (err,res)=>{
            if(err) throw err;
                console.log("Collection 'users' created!");
                client.close();
        });
});

let user = {};

MongoClient.connect(){
    db.collection('users').insertOne()
}
MongoClient.connect(){
    db.collection('users').findOne()
}