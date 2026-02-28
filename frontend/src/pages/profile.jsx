import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../styles/app.css";

export default function Profile() {
  const [image, setImage] = useState("");
  const token = localStorage.getItem("token");

  const handleImage = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => setImage(reader.result);
  };

  const updateProfile = async () => {
    if (!image) return alert("Please select image");

    await axios.put(
      "https://aerofeed-mern.onrender.com/auth/update-profile",
      { profilePic: image },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert("Profile Updated ✅");
  };

  return (
    <>
      <Navbar />

      <div className="profile-wrapper">
        <div className="profile-card">

          <div className="cover"></div>

          <div className="profile-image-section">
            <label htmlFor="upload-photo">
              <img
                src={
                  image ||
                  "https://i.pravatar.cc/150?img=12"
                }
                className="profile-img"
              />
              <div className="edit-icon">✏️</div>
            </label>

            <input
              type="file"
              id="upload-photo"
              hidden
              onChange={handleImage}
            />
          </div>

          <h3>Your Profile</h3>

          <button className="save-btn" onClick={updateProfile}>
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
}