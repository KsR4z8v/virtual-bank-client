import { Outlet } from "react-router-dom";
import "./forms.css";
import { useEffect } from "react";
import Info from "./Info";
import Header from "./Header";

function FormsView() {
  useEffect(() => {}, []);

  return (
    <>
      <Header />
      <div className="container-forms">
        <Outlet />
        <Info />
      </div>
    </>
  );
}

export default FormsView;
