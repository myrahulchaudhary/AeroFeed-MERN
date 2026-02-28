import mongoose from "mongoose";

const savedSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  }
});

savedSchema.index({ userId: 1, postId: 1 }, { unique: true });

export default mongoose.model("SavedPost", savedSchema);