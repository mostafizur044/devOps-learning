const mongooes = require("mongoose");

const postSchema = new mongooes.Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    body: {
        type: String,
        required: [true, "Body is required"]
    }
});

const Post = mongooes.model("Post", postSchema);
module.exports = Post;