class VideoException{
    constructor(errormessage){
        this.errormessage = errormessage;
    }
}

class Video {
    constructor(title, description, url, likes, uploadId, approved) {
        this._id = generateVideoID();
        this.title = title;
        this.description = description;
        this.url = url;
        this.likes = likes;
        this.uploadId = uploadId;
        this.approved = approved;
    }

    get id() {
        return this._id;
    }
    set id(value) {
        throw new VideoException("Video IDs are auto-generated");
    }

    get title() {
        return this._title;
    }
    set title(value) {
        if (typeof value !== 'string') {
            throw new VideoException('Title must be a string');
        }
        this._title = value;
    }

    get description() {
        return this._description;
    }
    set description(value) {
        if (typeof value !== 'string') {
            throw new VideoException('Description must be a string');
        }
        this._description = value;
    }

    get url() {
        return this._url;
    }
    set url(value) {
        if (typeof value !== 'string') {
            throw new VideoException('URL must be a string');
        }
        this._url = value;
    }

    get likes() {
        return this._likes;
    }
    set likes(value) {
        if (typeof value !== 'number' || !Number.isInteger(value)) {
            throw new VideoException('Likes must be an integer');
        }
        this._likes = value;
    }

    get uploadId() {
        return this._uploadId;
    }
    set uploadId(value) {
        if (typeof value !== 'number' || !Number.isInteger(value)) {
            throw new VideoException('Upload ID must be an integer');
        }
        this._uploadId = value;
    }

    get approved() {
        return this._approved;
    }
    set approved(value) {
        if (typeof value !== 'number' || !Number.isInteger(value)) {
            throw new VideoException('Approved must be an integer');
        }
        this._approved = value;
    }
    static createFromJson(jsonValue) {
        let obj = JSON.parse(jsonValue);
        return Video.createFromObject(obj);
    }

    static createFromObject(obj) {
        let newVideo = new Video(obj.title, obj.description, obj.url, obj.likes, obj.uploadId, obj.approved);
        newVideo._id = obj.id;
        return newVideo;
    }

    static cleanObject(obj) {
        const videoProperties = ['id', 'title', 'description', 'url', 'likes', 'uploadId', 'approved'];
        for (let prop in obj) {
            if (!videoProperties.includes(prop)) {
                delete obj[prop];
            }
        }
    }
}
