const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    name: {
        type: String,
    },
    avatar: {
        type: String,
    },
    text: {
        type: String,
        required: true,
    },
    likes: [
        {
            user: {
                type: mongoose.Types.ObjectId,
                ref: "User",
            },
        },
    ],
    comments: [
        {
            user: {
                type: mongoose.Types.ObjectId,
                ref: "User",
            },
            name: {
                type: String,
            },
            avatar: {
                type: String,
            },
            text: {
                type: String,
                required: true,
            },
            date: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = Post = mongoose.model("Post", PostSchema);
