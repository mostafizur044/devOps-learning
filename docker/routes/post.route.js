const express = require("express");
const postController = require("../controllers/post.controller");
const protect = require("../middleware/auth.middleware");
const router = express.Router();

router.route("/")
.get(protect, postController.getPosts)
.post(protect, postController.createPost);

router.route("/:id")
.get(protect, postController.getPost)
.patch(protect, postController.updatePost)
.delete(protect, postController.deletePost);

module.exports = router;