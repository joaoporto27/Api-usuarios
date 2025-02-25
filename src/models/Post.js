const {v4: uuid4} = require("uuid");

class Post {
    constructor (username, comment, image) {
    this.id = uuid4();
    this.username = username;
    this.comment = comment;
    this.image = image;
    }
}

module.exports = Post;