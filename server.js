"use strict";

const express = require('express');
const router = require('../../YoutubeClone/app/controllers/router');
const app = express();
const port = 3000;

app.use(express.json());
app.use(router);

app.listen(port, () => {
    console.log(`YoutubeClone app listening on port ${port}!`);
})
