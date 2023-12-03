"use strict";

const {MongoClient} = require('mongodb');

let mongoURl = "mongodb://localhost:27017"
let options = {
    useNewUrlParser: true
};
MongoClient.connect(mongoURl, options, (err,client)=>{
    if(err) throw err;
        console.log("Connected to MongoDB Server");
        const db = client.db('YoutubeClone');
        db.createCollection('videos', (err,res)=>{
            if(err) throw err;
                console.log("Collection 'videos' created!");
                client.close();
        });
});