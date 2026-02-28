import { useState } from "react";
import axios from "axios";

export default function CreatePost() {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null);
  const token = localStorage.getItem("token");

  const handleFile = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);

    reader.onload = () => {
      setFile({
        data: reader.result,
        type: selectedFile.type.includes("pdf")
          ? "pdf"
          : "image"
      });
    };
  };

  const handlePost = async () => {
    if (!caption && !file) {
      alert("Add caption or file");
      return;
    }

    await axios.post(
      "http://localhost:5000/posts/create",
      {
        caption,
        file: file?.data,
        fileType: file?.type,
        userName: "Your Name",
        profilePic: "https://i.pravatar.cc/150?img=12"
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    alert("Post Created 🚀");
    window.location.reload();
  };

  return (
    <div className="create-post">

      <textarea
        placeholder="What's on your mind?"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />

      <div className="post-actions">

        {/* PHOTO BUTTON */}
        <label className="upload-btn">
          📷 Photo
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleFile}
          />
        </label>

        {/* PDF BUTTON */}
        <label className="upload-btn">
          📄 PDF
          <input
            type="file"
            accept="application/pdf"
            hidden
            onChange={handleFile}
          />
        </label>

        <button onClick={handlePost} className="post-btn">
          Post
        </button>
      </div>
    </div>
  );
}