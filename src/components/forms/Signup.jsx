import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import useUser from "../../hooks/useUser";
import UserContext from "../../context/userContext";

function Signup() {
  const { redirect } = useParams();
  const [loader, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [firstNames, setFirstNames] = useState("");
  const [lastNames, setLastNames] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const { setLogged } = useContext(UserContext);
  const navigate = useNavigate();
  const { create } = useUser();
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  const step1 = () => {
    return (
      <>
        <p>Datos basicos</p>
        <input
          onChange={(e) => {
            setFirstNames(e.target.value);
          }}
          id="registro-nombres-input"
          className="input_signup input-form"
          type="text"
          placeholder="nombres"
        />
        <input
          onChange={(e) => {
            setLastNames(e.target.value);
          }}
          id="registro-apellidos-input"
          className="input_signup input-form"
          type="text"
          placeholder="Apellidos"
        />

        <input
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          id="registro-usuario-input"
          className="input_signup input-form"
          type="text"
          placeholder="Cedula"
          required
        />
        <input
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          id="registro-usuario-input"
          className="input_signup input-form"
          type="text"
          placeholder="Fecha de nacimiento"
          required
        />
      </>
    );
  };

  const aboutUser = () => {
    return (
      <>
        <p>Cuentanos un poco de ti, para conocerte mejor</p>
        <input
          onChange={(e) => {
            setLastNames(e.target.value);
          }}
          id="registro-apellidos-input"
          className="input_signup input-form"
          type="text"
          placeholder="Genero"
        />
        <input
          onChange={(e) => {
            setLastNames(e.target.value);
          }}
          id="registro-apellidos-input"
          className="input_signup input-form"
          type="text"
          placeholder="Ocupacion"
        />
        <input
          onChange={(e) => {
            setLastNames(e.target.value);
          }}
          id="registro-apellidos-input"
          className="input_signup input-form"
          type="text"
          placeholder="Estado civil"
        />
        <input
          onChange={(e) => {
            setLastNames(e.target.value);
          }}
          id="registro-apellidos-input"
          className="input_signup input-form"
          type="number"
          placeholder="Ingresos mensuales"
        />
      </>
    );
  };

  const userLocation = () => {
    return (
      <>
        <p>Ayudanos a ponernos en contacto contigo</p>
        <input
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          id="registro-usuario-input"
          className="input_signup input-form"
          type="text"
          placeholder="Celular"
          required
        />
        <input
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          id="registro-usuario-input"
          className="input_signup input-form"
          type="text"
          placeholder="Direccion"
          required
        />
      </>
    );
  };

  const setupAccount = () => {
    return (
      <>
        <p>Terminemos de configurar tu cuenta</p>
        <input
          onChange={(e) => {
            setPassword1(e.target.value);
          }}
          id="registro-contraseña-input"
          className="input_signup input-form"
          type="password"
          placeholder="Nombre de usuario"
          required
        />
        <input
          onChange={(e) => {
            setPassword1(e.target.value);
          }}
          id="registro-contraseña-input"
          className="input_signup input-form"
          type="password"
          placeholder="Contraseña mínimo 8 caracteres"
          required
        />
        <input
          onChange={(e) => {
            setPassword2(e.target.value);
          }}
          id="registro-contraseña-input-2"
          className="input_signup input-form"
          type="password"
          placeholder="Confirmar contraseña"
          required
        />
      </>
    );
  };

  const setupEmail = () => {
    return (
      <>
        <p>Ya casi acabamos</p>
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          id="registro-correo-input"
          className="input_signup input-form"
          type="email"
          placeholder="ejemplo@correo.co"
          required
        />
      </>
    );
  };

  const confirmEmail = () => {
    return (
      <>
        <p>
          Te hemos enviado un codigo de verificacion, por favor ingresalo para
          verificar tu correo electronico
        </p>
        <input
          onChange={(e) => {
            setPassword1(e.target.value);
          }}
          id="registro-contraseña-input"
          className="input_signup input-form"
          type="password"
          placeholder="Codigo de verificacion"
          required
        />
      </>
    );
  };

  useEffect(() => {
    setSteps([
      step1,
      aboutUser,
      userLocation,
      setupEmail,
      confirmEmail,
      setupAccount,
    ]);
  }, []);

  return (
    <>
      <div className="container_signup">
        <div className="header_signup">
          <div className="text">Empieza por aqui ...</div>
        </div>

        <div className="inputs_signup">
          {steps[currentStep] ? steps[currentStep]() : <></>}
          <div id="container_error_signup">{errorMessage}</div>
          <div
            onClick={() => {
              if (currentStep < steps.length - 1) {
                setCurrentStep(currentStep + 1);
              } else {
                setCurrentStep(0);
              }
            }}
            id="btn_registro"
            className="submit_signup"
          >
            {loader ? (
              <span className="loader form-loader"></span>
            ) : (
              "Siguiente"
            )}
          </div>
          <div className="has-account">
            <p>
              ¿Ya tienes una cuenta?
              <NavLink className="nav-link" to="/">
                <b>Inicia aquí</b>
              </NavLink>
            </p>
          </div>
          <div className="terminosCondiciones">
            Al unirte aceptas los términos y condiciones ®
          </div>
          <div className="underline"></div>{" "}
        </div>
      </div>
    </>
  );
}

export default Signup;
