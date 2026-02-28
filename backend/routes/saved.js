import express from "express";
import SavedPost from "../models/SavedPost.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/:id/save", auth, async (req, res) => {
  await SavedPost.create({
    userId: req.user.id,
    postId: req.params.id
  });

  res.json({ message: "Saved" });
});

router.delete("/:id/save", auth, async (req, res) => {
  await SavedPost.findOneAndDelete({
    userId: req.user.id,
    postId: req.params.id
  });

  res.json({ message: "Unsaved" });
});

router.get("/me/saved-posts", auth, async (req, res) => {
  const saved = await SavedPost.find({ userId: req.user.id })
    .populate("postId");

  res.json(saved.map(s => s.postId));
});

export default router;