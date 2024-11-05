import NavBar from "../components/navbar/NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import UploadPhotos from "../components/photos/UploadPhotosModal";
import { useContext, useState } from "react";
import UserContext from "../context/userContext";

function Home() {
  return (
    <>
      <div>
        <Outlet />

      </div>
    </>
  );
}
export default Home;
