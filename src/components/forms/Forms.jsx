import { Outlet } from "react-router-dom";

export default function Forms() {
  return (
    <div className="container-forms">
      <div className="container-background-image">
        <img
          className="background-image-form"
          src="../../assets/ishant-mishra-UXEJDX4SqdE-unsplash.jpg"
          alt=""
        />
      </div>
      <Outlet />
    </div>
  );
}
