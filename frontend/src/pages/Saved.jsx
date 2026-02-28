import { useEffect, useState } from "react";
import axios from "axios";

export default function Saved() {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchSaved();
  }, []);

  const fetchSaved = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/posts/saved",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div className="feed">
        <h2>Saved Posts</h2>

        {posts.length === 0 && (
          <div className="card">
            <p>No saved posts yet.</p>
          </div>
        )}

        {posts.map((post) => (
          <div key={post._id} className="card">
            <h4 style={{ color: "#2563eb" }}>{post.userName}</h4>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}