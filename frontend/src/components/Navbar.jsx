import { Link } from "react-router-dom";

export default function Navbar() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="bg-white shadow p-4 flex justify-between">
      <h1 className="font-bold text-xl">AeroFeed</h1>

      <div className="space-x-4">
        <Link to="/feed">Feed</Link>
        <Link to="/saved">Saved</Link>
        <button onClick={logout} className="text-red-500">
          Logout
        </button>
      </div>
    </div>
  );
}