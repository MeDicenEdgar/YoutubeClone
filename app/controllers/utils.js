"use strict";

function generateUID() {
    return Math.floor(100000 + Math.random() * 900000);
}

function generateVideoID() {
    return Math.floor(100000 + Math.random() * 900000);
}

module.exports = {
    generateUID,
    generateVideoID
};
