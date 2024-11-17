/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import useUser from "../../hooks/useUser";
import UserContext from "../../context/userContext";
import Button from "./Button";

function Signup() {
  const { setLogged } = useContext(UserContext);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [address, setAddress] = useState("");
  const [genre, setGenre] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateBorn, setDateBorn] = useState("");
  const [cc, setCc] = useState("");
  const [currentJob, setCurrentJob] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [cardPin, setCardPin] = useState("");
  const [cardPin2, setCardPin2] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const { createClient, verifyAccount } = useUser();

  const confirmAccountHandler = () => {
    if (verifyCode.length === 0) {
      return setErrorMessage("El codigo no puede ser vacio.");
    }
    verifyAccount(
      (data, error) => {
        if (error) {
          return setErrorMessage(error);
        }
        navigate("/forms");
      },
      {
        email,
        otp: verifyCode,
      }
    );
  };

  const validateAboutUserData = () => {
    setErrorMessage("");
    // Validación de género
    if (!genre) {
      setErrorMessage("El género es obligatorio.");
      return;
    }
    // Validación del trabajo
    if (!currentJob) {
      setErrorMessage("El puesto actual es obligatorio.");
      return;
    }

    // Validación de estado civil
    if (!maritalStatus) {
      setErrorMessage("El estado civil es obligatorio.");
      return;
    }
    // Validación del ingreso mensual
    if (monthlyIncome <= 0) {
      setErrorMessage("El ingreso mensual debe ser un valor mayor a 0.");
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const validateBasicData = () => {
    setErrorMessage("");
    // Validaciones del primer nombre
    if (!firstName) {
      setErrorMessage("El nombre es obligatorio.");
      return; // Detener validación si hay un error
    }
    // Validación de la fecha de nacimiento
    if (!dateBorn) {
      setErrorMessage("La fecha de nacimiento es obligatoria.");
      return false;
    } else if (new Date(dateBorn) > new Date()) {
      setErrorMessage("La fecha de nacimiento no puede ser futura.");
      return false;
    }
    // Validación de cédula o documento
    if (!cc || !/^\d{8,10}$/.test(cc)) {
      setErrorMessage("La cédula debe ser un número entre 8 y 10 dígitos.");
      return false;
    }
    // Validaciones del apellido
    if (!lastName) {
      setErrorMessage("El apellido es obligatorio.");
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const validateSetupData = () => {
    setErrorMessage("");
    // Validación del nombre de usuario
    if (!username) {
      setErrorMessage("El nombre de usuario es obligatorio.");
      return false;
    }
    // Validación de contraseña
    if (!password || password.length < 6) {
      setErrorMessage("La contraseña debe tener al menos 6 caracteres.");
      return false;
    }

    // Validación de confirmación de la contraseña
    if (password !== password2) {
      setErrorMessage("Las contraseñas no coinciden.");
      return false;
    }
    handlerSignup();
  };

  const validateSetupPinCard = () => {
    setErrorMessage("");
    // Validación del PIN de tarjeta
    if (!cardPin || !/^\d{4}$/.test(cardPin)) {
      setErrorMessage("El PIN debe ser un número de 4 dígitos.");
      return;
    }

    // Validación de confirmación del PIN
    if (cardPin !== cardPin2) {
      setErrorMessage("Los PINs no coinciden.");
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const validateUserLocationData = () => {
    setErrorMessage("");
    // Validación del email
    if (!email) {
      setErrorMessage("El email es obligatorio.");
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage("Por favor, ingresa un email válido.");
      return;
    }
    // Validación del número de teléfono
    if (!phoneNumber || !/^\d{10}$/.test(phoneNumber)) {
      setErrorMessage("El número de teléfono debe tener 10 dígitos.");
      return;
    }
    // Validación de la dirección
    if (!address) {
      setErrorMessage("La dirección es obligatoria.");
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const handlerSignup = () => {
    setLoader(true);
    createClient(
      (data, error) => {
        setLoader(false);
        if (error) {
          return setErrorMessage(error);
        }
        setCurrentStep(currentStep + 1);
      },
      {
        address,
        username,
        firstName,
        lastName,
        email,
        cc,
        password,
        genre,
        monthlyIncome,
        maritalStatus,
        cardPin,
        currentJob,
        dateBorn,
        phoneNumber,
      }
    );
  };

  const basicData = () => {
    return (
      <div className="container-steps">
        <div className="inputs-steps">
          <p>Datos basicos.</p>
          <input
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            value={firstName}
            id="registro-nombres-input"
            className="input-form"
            type="text"
            placeholder="nombres"
          />
          <input
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            value={lastName}
            id="registro-apellidos-input"
            className="input-form"
            type="text"
            placeholder="Apellidos"
          />
          <input
            onChange={(e) => {
              setCc(e.target.value);
            }}
            value={cc}
            id="registro-usuario-input"
            className="input-form"
            type="text"
            placeholder="Cedula"
            required
          />
          <input
            onChange={(e) => {
              setDateBorn(e.target.value);
            }}
            value={dateBorn}
            id="registro-usuario-input"
            className="input-form"
            type="date"
            placeholder="Fecha de nacimiento"
            required
          />
        </div>

        <Button
          key={0}
          onAction={() => {
            validateBasicData();
          }}
          tittle={"Siguiente"}
        />
      </div>
    );
  };

  const aboutUser = () => {
    return (
      <div className="container-steps">
        <div className="inputs-steps">
          <p>Cuentanos un poco de ti, para conocerte mejor.</p>
          <input
            onChange={(e) => {
              setGenre(e.target.value);
            }}
            value={genre}
            id="genre-input"
            className="input-form"
            type="text"
            placeholder="Genero"
          />
          <input
            onChange={(e) => {
              setCurrentJob(e.target.value);
            }}
            value={currentJob}
            id="ocupation-input"
            className="input-form"
            type="text"
            placeholder="Ocupacion"
          />
          <input
            onChange={(e) => {
              setMaritalStatus(e.target.value);
            }}
            value={maritalStatus}
            id="civilState-input"
            className="input-form"
            type="text"
            placeholder="Estado civil"
          />
          <input
            onChange={(e) => {
              setMonthlyIncome(e.target.value);
            }}
            value={monthlyIncome}
            id="monthlyIncome-input"
            className="input-form"
            type="number"
            placeholder="Ingresos mensuales"
          />
        </div>
        <Button
          key={1}
          onAction={() => {
            validateAboutUserData();
          }}
          tittle={"Siguiente"}
        />
        <Button
          key={2}
          onAction={() => {
            setCurrentStep(currentStep - 1);
          }}
          tittle={"Volver"}
        />
      </div>
    );
  };

  const userLocation = () => {
    return (
      <div className="container-steps">
        <div className="inputs-steps">
          <p>Ayudanos a ponernos en contacto contigo.</p>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            id="registro-correo-input"
            className="input-form"
            type="email"
            placeholder="ejemplo@correo.co"
            required
          />
          <input
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
            value={phoneNumber}
            id="phoneNumber-input"
            className="input-form"
            type="text"
            placeholder="Celular"
            required
          />
          <input
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            value={address}
            id="address-input"
            className="input-form"
            type="text"
            placeholder="Direccion"
            required
          />
        </div>
        <Button
          onAction={() => {
            validateUserLocationData();
          }}
          tittle={"Siguiente"}
        />
        <Button
          onAction={() => {
            setCurrentStep(currentStep - 1);
          }}
          tittle={"Volver"}
        />
      </div>
    );
  };

  const setupAccount = () => {
    // Realiza registro
    return (
      <div className="container-steps">
        <div className="inputs-steps">
          <p>Terminemos de configurar tu cuenta.</p>
          <input
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            value={username}
            id="registro-contraseña-input"
            className="input-form"
            type="text"
            placeholder="Nombre de usuario"
            required
          />
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            id="registro-contraseña-input"
            className="input-form"
            type="password"
            placeholder="Contraseña mínimo 8 caracteres"
            required
          />
          <input
            onChange={(e) => {
              setPassword2(e.target.value);
            }}
            value={password2}
            id="registro-contraseña-input-2"
            className="input-form"
            type="password"
            placeholder="Confirmar contraseña"
            required
          />
        </div>
        {loader ? <span className="loader form-loader"></span> : <></>}
        <Button
          onAction={() => {
            validateSetupData();
          }}
          tittle={"Registrarme"}
        />
        <Button
          onAction={() => {
            setCurrentStep(currentStep - 1);
          }}
          tittle={"Volver"}
        />
      </div>
    );
  };

  const setupPinCard = () => {
    return (
      <div className="container-steps">
        <div className="inputs-steps">
          <p>
            Por favor, ingresa y confirma tu nuevo PIN de 4 dígitos para tu
            tarjeta de débito. Asegúrate de que tu PIN sea fácil de recordar.
          </p>
          <p>
            Una vez confirmado, podrás usarlo para realizar tus transacciones de
            manera segura.
          </p>
          <input
            onChange={(e) => {
              setCardPin(e.target.value);
            }}
            value={cardPin}
            id="registro-contraseña-input"
            className="input-form"
            type="password"
            placeholder="pin"
            required
            maxLength={4}
          />
          <input
            onChange={(e) => {
              setCardPin2(e.target.value);
            }}
            value={cardPin2}
            id="registro-contraseña-input-2"
            className="input-form"
            type="password"
            placeholder="Confirmar pin"
            required
            maxLength={4}
          />
        </div>
        <Button
          onAction={() => {
            validateSetupPinCard();
          }}
          tittle={"Siguiente"}
        />
        <Button
          onAction={() => {
            setCurrentStep(currentStep - 1);
          }}
          tittle={"Volver"}
        />
      </div>
    );
  };

  const confirmAccount = () => {
    return (
      <div className="container-steps">
        <div className="inputs-steps">
          <p>
            Hemos enviado un codigo a tu correo electronico, ingresalo para
            poder activar tu cuenta.
          </p>
          <input
            onChange={(e) => {
              setVerifyCode(e.target.value);
            }}
            value={verifyCode}
            id="verifyCode-input"
            className="input-form"
            type="text"
            placeholder="Codigo de verificacion"
            required
          />
        </div>
        <Button
          onAction={() => {
            confirmAccountHandler();
          }}
          tittle={"Confirmar"}
        />
        <Button
          onAction={() => {
            setCurrentStep(currentStep - 1);
          }}
          tittle={"Volver - dev"}
        />
      </div>
    );
  };

  useEffect(() => {
    setSteps([
      basicData,
      aboutUser,
      userLocation,
      setupPinCard,
      setupAccount,
      confirmAccount,
    ]);
  }, [
    currentStep,
    firstName,
    lastName,
    cc,
    dateBorn,
    genre,
    currentJob,
    address,
    email,
    maritalStatus,
    monthlyIncome,
    phoneNumber,
    username,
    password,
    password2,
    cardPin2,
    cardPin,
    loader,
    verifyCode,
  ]);

  return (
    <>
      <div className="container_signup">
        <div className="header_signup">
          <div className="text">Empieza aqui</div>
        </div>

        <div className="inputs_signup">
          <div className="container-steps">
            {steps[currentStep] ? steps[currentStep]() : <></>}
          </div>
          <div id="container_error_signup">{errorMessage}</div>

          <div className="has-account">
            <p>
              ¿Ya tienes una cuenta?
              <NavLink className="nav-link" to="/forms">
                <b>Inicia aquí</b>
              </NavLink>
            </p>
          </div>
          <div className="terminosCondiciones">
            Al unirte aceptas los términos y condiciones ®
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
