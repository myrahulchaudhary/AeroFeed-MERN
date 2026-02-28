import { useState } from "react";
import axios from "axios";

export default function Sidebar() {
  const [image, setImage] = useState(
    "https://i.pravatar.cc/150?img=12"
  );

  const token = localStorage.getItem("token");

  const handleImage = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = async () => {
      setImage(reader.result);

      await axios.put(
        "http://localhost:5000/auth/update-profile",
        { profilePic: reader.result },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    };
  };

  return (
    <div className="sidebar">
      <label htmlFor="profileUpload">
        <img src={image} className="profile-pic" />
      </label>

      <input
        type="file"
        hidden
        id="profileUpload"
        onChange={handleImage}
      />

      <h4>Your Name</h4>

      <div className="menu">
        <button>My Posts</button>
        <button>Saved</button>
      </div>
    </div>
  );
}