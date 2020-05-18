const express = require("express");
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Post = require("../../models/Post");
const router = express.Router();

// @route POST api/posts
// @desc post a post
// @access private
router.post(
    "/",
    [
        auth,
        [
            check("text", "Text is required.")
                .not()
                .isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const user = await User.findById(req.user.id);
            const newPost = new Post({
                text: req.body.text,
                user: req.user.id,
                name: user.name,
                avatar: user.avatar,
            });
            const post = await newPost.save();
            res.json(post);
        } catch (error) {}
    }
);

// @route GET api/posts
// @desc get all posts
// @access private (incentivise user to sign up to post things or see posts)
router.get("/", auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 }); //newest posts first
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error.");
    }
});

// @route GET api/posts/:post_id
// @desc get post by post_id
// @access private
router.get("/:post_id", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);
        if (!post) {
            return res.status(404).json({ msg: "Post not found." });
        }
        res.json(post);
    } catch (error) {
        if (error instanceof mongoose.Error.CastError) {
            return res.status(404).json({ msg: "Post not found." });
        }
        console.error(error);
        res.status(500).send("Server error.");
    }
});

// @route DELETE api/posts/:post_id
// @desc delete post by post_id
// @access private
router.delete("/:post_id", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);
        if (!post) {
            return res.status(404).json({ msg: "Post not found." });
        }
        if (post.user.toString() !== req.user.id) {
            //check whether the requestee is the owner of the post. Impossible to do via UI but it's to ward against attacks perhaps via postman,
            return res.status(400).json({ msg: "User not authorised." });
        }
        await post.remove();

        res.json("Post deleted.");
    } catch (error) {
        if (error instanceof mongoose.Error.CastError) {
            return res.status(404).json({ msg: "Post not found." });
        }
        console.error(error);
        res.status(500).send("Server error.");
    }
});

// @route PUT api/posts/like/:post_id
// @desc like a post by post_id
// @access private
router.put("/like/:post_id", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);
        if (!post) {
            return res.status(404).json({ msg: "Post not found." });
        }
        if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
                .length > 0
        ) {
            return res.status(400).json({ msg: "Post already liked by user." });
        }
        post.likes.unshift({ user: req.user.id });
        await post.save();
        res.json(post.likes);
    } catch (error) {
        if (error instanceof mongoose.Error.CastError) {
            return res.status(404).json({ msg: "Post not found." });
        }
        console.error(error);
        res.status(500).send("Server error.");
    }
});

// @route PUT api/posts/unlike/:post_id
// @desc unlike a post by post_id
// @access private
router.put("/unlike/:post_id", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);
        if (!post) {
            return res.status(404).json({ msg: "Post not found." });
        }
        if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
                .length === 0
        ) {
            return res.status(400).json({ msg: "Post not liked by user yet." });
        }
        const index = post.likes.findIndex(
            (like) => like.user.toString() === req.user.id
        );
        post.likes.splice(index, 1);
        await post.save();
        res.json(post.likes);
    } catch (error) {
        if (error instanceof mongoose.Error.CastError) {
            return res.status(404).json({ msg: "Post not found." });
        }
        console.error(error);
        res.status(500).send("Server error.");
    }
});

// @route POST api/posts/comment/:post_id
// @desc comment on a post by post_id
// @access private
router.post(
    "/comment/:post_id",
    [
        auth,
        [
            check("text", "Text required.")
                .not()
                .isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const post = await Post.findById(req.params.post_id);
            if (!post) {
                return res.status(404).json({ msg: "Post not found." });
            }
            const user = await User.findById(req.user.id);
            const newComment = {
                user: req.user.id,
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
            };
            post.comments.unshift(newComment);
            await post.save();
            res.json(post.comments);
        } catch (error) {
            if (error instanceof mongoose.Error.CastError) {
                return res.status(404).json({ msg: "Post not found." });
            }
            console.error(error);
            res.status(500).send("Server error.");
        }
    }
);

// @route DELETE api/posts/coment/:post_id/:comment_id
// @desc remove comment on a post via post_id and comment_id
// @access private
router.delete("/comment/:post_id/:comment_id", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);
        if (!post) {
            return res.status(404).json({ msg: "Post not found." });
        }
        const index = post.comments.findIndex(
            (comment) => comment._id.toString() === req.params.comment_id
        );
        if (index === -1) {
            return res.status(404).json({ msg: "Comment not found." });
        }
        if (post.comments[index].user.toString() !== req.user.id) {
            return res.status(400).json({ msg: "User not authorised." });
        }
        post.comments.splice(index, 1);
        await post.save();
        res.json(post.comments);
    } catch (error) {
        if (error instanceof mongoose.Error.CastError) {
            return res.status(404).json({ msg: "Post not found." });
        }
        console.error(error);
        res.status(500).send("Server error.");
    }
});
module.exports = router;
