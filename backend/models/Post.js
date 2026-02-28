import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    userId: String,
    userName: String,
    likes: {
      type: [String],
      default: [],
    },
    savedBy: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);