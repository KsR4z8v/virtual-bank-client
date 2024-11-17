import { useEffect, useState, useContext } from "react";
import useUser from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/userContext";
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
        window.sessionStorage.setItem("session", JSON.stringify(data.data));
        navigate("/lobby");
      },
      { user, password }
    );
  };

  useEffect(() => {}, []);

  return (
    <>
      <div className="container">
        <div className="header-form">
          <div className="text">Inicia</div>
          <div className="underline"></div>
        </div>

        <div className="inputs">
          <div className="input">
            <input
              id="login-username-input"
              onChange={(event) => setUser(event.target.value)}
              className="form_sign__input-username input-form"
              type="text"
              placeholder="Usuario o email"
            />
          </div>

          <div className="input">
            <input
              id="login-password-input"
              onChange={(event) => setPassword(event.target.value)}
              className="form_sign__input-password input-form"
              type="password"
              placeholder="Contraseña"
            />
          </div>
          {/* Mensaje de error si hay un problema */}
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
