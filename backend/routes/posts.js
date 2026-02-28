import express from "express";
import Post from "../models/Post.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

/* CREATE POST */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content)
      return res.status(400).json({ message: "Title & content required" });

    const newPost = new Post({
      title,
      content,
      userId: req.user.id,
      userName: req.user.name,
    });

    const saved = await newPost.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Error creating post" });
  }
});

/* GET ALL POSTS */
router.get("/", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});

/* LIKE */
router.put("/like/:id", authMiddleware, async (req, res) => {
  const post = await Post.findById(req.params.id);

  const index = post.likes.indexOf(req.user.id);

  if (index === -1) {
    post.likes.push(req.user.id);
  } else {
    post.likes.splice(index, 1);
  }

  await post.save();
  res.json(post);
});

/* SAVE */
router.put("/save/:id", authMiddleware, async (req, res) => {
  const post = await Post.findById(req.params.id);

  const index = post.savedBy.indexOf(req.user.id);

  if (index === -1) {
    post.savedBy.push(req.user.id);
  } else {
    post.savedBy.splice(index, 1);
  }

  await post.save();
  res.json(post);
});

/* GET SAVED */
router.get("/saved", authMiddleware, async (req, res) => {
  const posts = await Post.find({
    savedBy: req.user.id,
  }).sort({ createdAt: -1 });

  res.json(posts);
});

export default router;