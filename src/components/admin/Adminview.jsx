import "./Adminview.css";
import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminView = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const session = window.localStorage.getItem("session");
    const userInfo = window.localStorage.getItem("userInfo");
    if (!session) {
      navigate("/");
    }
  }, []);
  return (
    <div className="admin-view">
      <Navbar />

      <div className="container-info-views">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminView;
