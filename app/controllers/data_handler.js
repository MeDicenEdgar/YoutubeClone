"use strict";

let users = []
let videos = []

function getUsers() {
    return users;
}

function getVideos() {
    return videos;
}

function getUserById(uid) {
    return users.find(user => user._uid === uid);
}

function createUser(user) {
    let check = false;
    user = User.createFromObject(user);
    if(user._uid!==undefined){
        check=true;
    }
    let newUser = new User(user.email, user.password, user.avatar, user.admin, user.videos, user.likes);
    if(check===true){
        newUser._uid=user.uid;
    }
    users.push(newUser);
    return newUser;
}

function createVideo(video) {
    let check = false;
    console.log(video);
    video = Video.createFromObject(video);
    if(video._id!==undefined){
        check=true;
    }
    let newVideo = new Video(video.title, video.description, video.url, video.likes, video.uploadId, video.approved);
    if(check===true){
        newVideo._uid=user.uid;
    }
    videos.push(newVideo);
    return newVideo;
}

function updateUser(uid, updatedUser) {
    const userIndex = users.findIndex(user => user.uid === uid);
    console.log(userIndex);
    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updatedUser };
    } else {
        throw new Error("User not found.");
    }
}

function updateVideo(id, updatedVideo) {
    // find -> update
    const videoIndex = videos.findIndex(video => video.id === id);
    if (videoIndex !== -1) {
        videos[videoIndex] = { ...videos[videoIndex], ...updatedVideo };
    } else {
        throw new Error("Video not found.");
    }
}

function deleteUser(uid) {
    // find -> delete
    const userIndex = users.findIndex(user => user.uid === uid);
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
    } else {
        throw new Error("User not found.");
    }
}

function deleteVideo(id) {
    // find -> delete
    const videoIndex = videos.findIndex(video => video.id === id);
    if (videoIndex !== -1) {
        videos.splice(videoIndex, 1);
    } else {
        throw new Error("Video not found.");
    }
}
