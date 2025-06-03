import { Outlet } from "react-router-dom";

export default function Forms() {
  return (
    <div className="container-forms">
      <div className="container-background-image">
        <img
          className="background-image-form"
          src="https://media.istockphoto.com/id/1436103008/es/foto/maqueta-de-plantilla-de-mano-para-el-pago-con-tarjeta-de-cr%C3%A9dito-en-l%C3%ADnea-para-compras-en.jpg?s=2048x2048&w=is&k=20&c=NPD0d-WrLHI7QzPKU4IHYhOZzkNtF4la2EhlEmBL6rw="
          alt=""
        />
      </div>
      <Outlet />
    </div>
  );
}
