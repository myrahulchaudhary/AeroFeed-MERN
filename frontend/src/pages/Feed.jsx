import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Feed() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const token = localStorage.getItem("token");

  let userId = null;

  if (token) {
    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      userId = decoded.id;
    } catch (err) {
      console.log("Token decode error");
    }
  }

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      fetchPosts();
    }
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("https://aerofeed-mern.onrender.com/posts");
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreatePost = async () => {
    if (!title || !content) return alert("Fill all fields");

    try {
      await axios.post(
        "https://aerofeed-mern.onrender.com/posts",
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      setContent("");
      fetchPosts();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  const handleLike = async (id) => {
    try {
      await axios.put(
        `https://aerofeed-mern.onrender.com/posts/like/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchPosts();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSave = async (id) => {
    try {
      await axios.put(
        `https://aerofeed-mern.onrender.com/posts/save/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchPosts();
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <div className="navbar">
        <h1>AeroFeed</h1>
        <div className="nav-links">
          <span onClick={() => navigate("/feed")}>Feed</span>
          <span onClick={() => navigate("/saved")}>Saved</span>
          <button className="secondary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="container">
        <div className="feed">

          {/* CREATE POST */}
          <div className="card create-card">
            <h3>Create Post</h3>

            <input
              type="text"
              placeholder="Post Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <button className="primary" onClick={handleCreatePost}>
              Post
            </button>
          </div>

          {posts.length === 0 && (
            <div className="card">
              <p>No posts yet. Create your first post 🚀</p>
            </div>
          )}

          {posts.map((post) => (
            <div key={post._id} className="card post-card">
              <h4 style={{ color: "#2563eb" }}>{post.userName}</h4>
              <h3>{post.title}</h3>
              <p>{post.content}</p>

              <div className="post-actions">
                <button
                  onClick={() => handleLike(post._id)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: post.likes.includes(userId) ? "red" : "black",
                  }}
                >
                  ❤️ {post.likes.length}
                </button>

                <button
                  onClick={() => handleSave(post._id)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: post.savedBy.includes(userId)
                      ? "green"
                      : "black",
                  }}
                >
                  💾 Save
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}