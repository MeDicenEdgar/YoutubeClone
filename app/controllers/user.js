"use strict";


class UserException{
    constructor(errormessage){
        this.errormessage = errormessage;
    }
}

class User {
    constructor(email, password, avatar, admin, videos, likes) {
        this._uid = generateUID();
        this.email = email;
        this.password = password;
        this.avatar = avatar;
        this.admin = admin;
        this.videos = videos || []; 
        this.likes = likes || [];
    }

    get uid() {
        return this._uid;
    }
    set uid(value) {
        throw new UserException("User UUIDs are auto-generated");
    }

    get email() {
        return this._email;
    }
    set email(value) {
        if (typeof value !== "string" || value === '') {
            throw new UserException("Email can not be empty");
        }
        this._email = value;
    }

    get password() {
        return this._password;
    }
    set password(value) {
        if (typeof value !== "string") {
            throw new UserException("Password must be a string");
        }
        this._password = value;
    }

    get avatar() {
        return this._avatar;
    }
    set avatar(value) {
        if (typeof value !== "string") {
            throw new UserException("Avatar image URL must be a string");
        }
        this._avatar = value;
    }

    get admin() {
        return this._admin;
    }
    set admin(value) {
        if (typeof value !== 'number' || !Number.isInteger(value)) {
            throw new VideoException('Admin value must be an integer');
        }
        this._admin = value; 
    }

    get videos() {
        return this._videos;
    }
    set videos(value) {
        if (!Array.isArray(value)) {
            throw new UserException("Videos must be an array");
        }
        this._videos = value;
    }

    get likes() {
        return this._likes;
    }
    set likes(value) {
        if (!Array.isArray(value)) {
            throw new UserException("Likes must be an array");
        }
        this._likes = value;
    }

    removeVideoByID(videoIDToRemove) {
        if (!Array.isArray(this._videos)) {
            throw new UserException("Videos must be an array");
        }

        const indexToRemove = this._videos.findIndex(video => video.id === videoIDToRemove);

        if (indexToRemove !== -1) {
            this._videos.splice(indexToRemove, 1);
        } else {
            throw new UserException("Video with the specified ID not found in the list");
        }
    }

    removeLikeByID(likeIDToRemove) {
        if (!Array.isArray(this._likes)) {
            throw new UserException("Likes must be an array");
        }

        const indexToRemove = this._likes.findIndex(like => like.id === likeIDToRemove);

        if (indexToRemove !== -1) {
            this._likes.splice(indexToRemove, 1);
        } else {
            throw new UserException("Like with the specified ID not found in the list");
        }
    }

    addVideo(videoToAdd) {
        if (!Array.isArray(this._videos)) {
            throw new UserException("Videos must be an array");
        }

        if (this._videos.some(video => video.id === videoToAdd.id)) {
            throw new UserException("Video with the specified ID already exists in the list");
        }

        this._videos.push(videoToAdd);
    }

    addLike(likeToAdd) {
        if (!Array.isArray(this._likes)) {
            throw new UserException("Likes must be an array");
        }

        if (this._likes.some(like => like.id === likeToAdd.id)) {
            throw new UserException("Like with the specified ID already exists in the list");
        }

        this._likes.push(likeToAdd);
    }

    static createFromJson(jsonValue) {
        let obj = JSON.parse(jsonValue);
        return User.createFromObject(obj);
    }

    static createFromObject(obj) {
        let newUser = new User(obj.email, obj.password, obj.avatar, obj.admin, obj.videos, obj.likes);
        newUser._uid = obj.uid;

        return newUser;
    }

    static cleanObject(obj) {
        const userProperties = ['uid', 'email', 'password', 'avatar', 'admin', 'videos', 'likes'];
        for (let prop in obj) {
            if (!userProperties.includes(prop)) {
                delete obj[prop];
            }
        }
    }
}

