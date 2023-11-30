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
        db.createCollection('videos', (err,res)=>{
            if(err) throw err;
                console.log("Collection 'videos' created!");
                client.close();
        });
});

let video = {};

MongoClient.connect(){
    db.collection('videos').insertOne()
}
MongoClient.connect(){
    db.collection('videos').findOne()
}