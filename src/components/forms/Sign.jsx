import { useEffect, useState, useContext } from "react";
import useUser from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/userContext";
import { IoArrowBack } from "react-icons/io5";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import "./forms.css";

function Sign() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { setLogged } = useContext(UserContext);
  const navigate = useNavigate();
  const { sign } = useUser();

  const signHandler = () => {
    setErrorMessage("");
    if (user.trim() === "" || password.trim() === "") {
      return setErrorMessage("Asegúrate de llenar todos los campos");
    }
    setLoader(true);
    sign(
      (data, err) => {
        setLoader(false); // Detener el cargador cuando se recibe respuesta
        if (err) {
          return setErrorMessage(err);
        }
        setLogged(true);
        window.localStorage.setItem("session", JSON.stringify(data.data));

        if (data.data.roles.includes(1)) {
          navigate("/admin");
        } else {
          navigate("/lobby");
        }
      },
      { user, password }
    );
  };

  useEffect(() => {}, []);

  return (
    <>
      <div className="container">
        <IoArrowBack
          className="back-icon"
          onClick={() => navigate("/")}
          size={30}
        />
        <RiMoneyDollarCircleFill className="icon-logo-form" size={30} />

        <div className="header-form">
          <div className="text">Inicia </div>
        </div>

        <div className="inputs">
          <input
            id="login-username-input"
            onChange={(event) => setUser(event.target.value)}
            className="form_sign__input-username input-form"
            type="text"
            placeholder="usuario"
          />

          <input
            id="login-password-input"
            onKeyDown={(e) => {
              if (e.key === "Enter") signHandler();
            }}
            onChange={(event) => setPassword(event.target.value)}
            className="form_sign__input-password input-form"
            type="password"
            placeholder="Contraseña"
          />

          {errorMessage && (
            <div id="container_error" className="form-sign__container-error">
              {errorMessage}
            </div>
          )}

          <div className="forgot-password">
            <span
              onClick={() => navigate("/forms/recoverpass")}
              style={{ cursor: "pointer" }}
            >
              Olvidé mi contraseña
            </span>
          </div>
          {loader ? <span className="loader form-loader"></span> : <></>}
          <div className="submit-container">
            <div className="submit" onClick={signHandler}>
              Iniciar sesion
            </div>

            <div className="submit" onClick={() => navigate("/forms/signup")}>
              <b>Regístrate aquí</b>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sign;
