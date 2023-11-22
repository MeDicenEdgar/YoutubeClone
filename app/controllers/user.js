"use strict";


class UserException{
    constructor(errormessage){
        this.errormessage = errormessage;
    }
}


class User{
    constructor(email, password, avatar, admin){
        this._uid=generateUID()
        this.email=email;
        this.password=password;
        this.avatar=avatar;
        this.admin=admin;
        this._videoIDs = []
        this._likeIDs = []
    }
    get uid(){
        return this._uid;
    }
    set uid(value){
        throw new UserException("Product UUIDs are auto-generated")
    }
    get email(){
        return this._email;
    }
    set email(email){
        if(typeof value !== "string" || value === ''){
            throw new UserException("Email can not be empty")
        }
        this._email = email;
    }
    get password(){
        return this._password;
    }

    set password(value) {
        if (typeof value !== "string") {
            throw new UserException("Password must be a string");
        }
        this._description = value;
    }

    get avatar() {
        return this._avatar;
    }

    set avatar(value) {
        if (typeof value !== "string") {
            throw new ProductException("Avatar image URL must be a string");
        }
        this._imageUrl = value;
    }

    get admin() {
        return this._unit;
    }

    set admin(value) {
        if (typeof value !== "string") {
            throw new ProductException("Admin status must be string");
        }
        if(value === "1"){
            this._unit = true;
        }
        else if(value === "0"){
            this._unit = false;
        }
        else{
            this._unit = undefined;
        }
    }

    static createFromJson(jsonValue){
        let obj = JSON.parse(jsonValue);
        return Product.createFromObject(obj);
    }

    static createFromObject(obj){
        let newProduct = {}
        Object.assign(newProduct, obj);
        User.cleanObject(newProduct);

        let user = new User(obj.email, obj.password, obj.avatar, obj.admin);
        product._uid = obj.uid

        return user;
    }
    static cleanObject(obj){
        const productProperties = ['uid', 'password', 'avatar', 'admin'];
        for (let prop in obj){
            if (!productProperties.includes(prop)) {
                delete obj[prop];
            }
        }
    }
}
module.exports = Product;