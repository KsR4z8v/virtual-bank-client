/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import useUser from "../../hooks/useUser";
import formatNumber from "../../utils/formatNumber";
import { IoArrowBack } from "react-icons/io5";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import {
  maritalStatusEnum,
  documentTypesEnum,
  ocupationsEnum,
  genreEnum,
} from "../../utils/enums";
import Button from "./Button";

function Signup() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [address, setAddress] = useState("");
  const [genre, setGenre] = useState(1);
  const [lastName, setLastName] = useState("");
  const [dateBorn, setDateBorn] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [documentTypeId, setDocumentTypeId] = useState(1);
  const [currentJob, setCurrentJob] = useState(1);
  const [maritalStatus, setMaritalStatus] = useState(1);
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [cardPin, setCardPin] = useState("");
  const [cardPin2, setCardPin2] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [nit, setNit] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyPhoneNumber, setCompanyPhoneNumber] = useState("");
  const [numberOfEmployees, setNumberOfEmployees] = useState(0);
  const [description, setDescription] = useState("");
  const isBusiness = useRef();
  const [steps, setSteps] = useState([]);
  const { createUser, verifyAccount, valdiateField } = useUser();

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
    if (!genre || genre === "-1") {
      setErrorMessage("El género es obligatorio.");
      return;
    }
    // Validación del trabajo
    if (!currentJob || currentJob === "-1") {
      setErrorMessage("El puesto actual es obligatorio.");
      return;
    }
    // Validación de estado civil
    if (!maritalStatus || maritalStatus === "-1") {
      setErrorMessage("El estado civil es obligatorio.");
      return;
    }
    // Validación del ingreso mensual
    if (monthlyIncome < 0) {
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
    // Validaciones del apellido
    if (!lastName) {
      setErrorMessage("El apellido es obligatorio.");
      return;
    }
    // Validación de la fecha de nacimiento
    if (!dateBorn) {
      setErrorMessage("La fecha de nacimiento es obligatoria.");
      return false;
    } else if (new Date(dateBorn) > new Date()) {
      setErrorMessage("La fecha de nacimiento no puede ser futura.");
      return false;
    } else if (Date.now() - new Date(dateBorn) < 568036800000) {
      setErrorMessage("Debes de ser mayor de edad.");
      return false;
    }
    if (!documentNumber || !/^\d{6,10}$/.test(documentNumber)) {
      // Validación de cédula o documento
      setErrorMessage("La cédula debe ser un número entre 8 y 10 dígitos.");
      return false;
    }

    valdiateField(
      (data) => {
        if (data) {
          console.log(data);
          return setErrorMessage("El numero de cedula ya esta en uso.");
        }
        setCurrentStep(currentStep + 1);
      },
      { documentNumber }
    );
  };
  const validateBasicDataEnterprise = () => {
    setErrorMessage("");
    // Validaciones del primer nombre
    if (!companyName) {
      setErrorMessage("El nombre de la empresa obligatorio.");
      return; // Detener validación si hay un error
    }

    if (!description) {
      setErrorMessage("La descripcion de la empresa es obligatoria");
      return; // Detener validación si hay un error
    }
    if (!companyPhoneNumber) {
      setErrorMessage(
        "El numero de telefono de contacto de la empresa es obligatorio."
      );
      return; // Detener validación si hay un error
    }
    if (!companyAddress) {
      setErrorMessage("La direccion de la empresa es obligatorio.");
      return; // Detener validación si hay un error
    }

    // Validación de cédula o documento
    if (!nit || !/^\d{6,10}$/.test(nit)) {
      setErrorMessage("El nit debe ser un número entre 8 y 10 dígitos.");
      return false;
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
    valdiateField(
      (data) => {
        if (data) {
          console.log(data);
          return setErrorMessage("El nombre de usuario ya esta en uso.");
        }
        handlerSignup();
      },
      { username }
    );
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
    valdiateField(
      (data) => {
        if (data) {
          console.log(data);
          return setErrorMessage("El correo electronico ya esta en uso.");
        }
        valdiateField(
          (data) => {
            if (data) {
              console.log(data);
              return setErrorMessage("El numero celular ya esta en uso.");
            }
            setCurrentStep(currentStep + 1);
          },
          { phoneNumber }
        );
      },
      { email }
    );
  };

  const handlerSignup = () => {
    setLoader(true);

    createUser(
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
        documentNumber,
        documentTypeId,
        password,
        genre,
        monthlyIncome: monthlyIncome.replaceAll(".", ""),
        maritalStatus,
        cardPin,
        currentJob,
        dateBorn,
        phoneNumber,
        company: isBusiness
          ? {
              companyAddress,
              companyName,
              numberOfEmployees,
              companyPhoneNumber,
              description,
              nit,
            }
          : undefined,
      },
      "client"
    );
  };

  const userTypeCheck = () => {
    isBusiness.current = undefined;
    return (
      <>
        <div className="inputs-steps">
          <p>Que tipo de usuario eres ?</p>

          <div id="pregunta">
            <label htmlFor="user-client">
              Cliente
              <input
                onClick={() => {
                  isBusiness.current = false;
                }}
                type="radio"
                name="user"
                id="user-client"
                radioGroup="pregunta"
                value="xl"
              />
            </label>

            <label htmlFor="user-enterprise">
              Empresa
              <input
                onClick={() => {
                  isBusiness.current = true;
                }}
                type="radio"
                name="user"
                id="user-enterprise"
                radioGroup="pregunta"
              />
            </label>
          </div>
        </div>
        <Button
          onAction={() => {
            if (isBusiness.current === undefined) {
              return setErrorMessage("Debes seleccionar una opcion.");
            }
            setErrorMessage("");
            setCurrentStep(currentStep + 1);
          }}
          tittle={"Siguiente"}
        />
      </>
    );
  };

  const basicData = () => {
    return (
      <>
        <div className="inputs-steps">
          <p>
            Datos basicos{" "}
            {isBusiness ? "del representante legal de la empresa" : ""}.
          </p>
          <input
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            value={firstName}
            className="input-form"
            type="text"
            placeholder="nombres"
          />
          <input
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            value={lastName}
            className="input-form"
            type="text"
            placeholder="Apellidos"
          />
          <select
            onChange={(e) => {
              setDocumentTypeId(Number(e.target.value));
            }}
            value={genre}
            className="input-form"
            placeholder="tipo de documento"
          >
            <option value={documentTypeId}>
              {documentTypesEnum[documentTypeId]}
            </option>
            {Object.keys(documentTypesEnum).map((m, i) => {
              return (
                <option key={i} value={m}>
                  {documentTypesEnum[m]}
                </option>
              );
            })}
          </select>

          <input
            onChange={(e) => {
              setDocumentNumber(e.target.value);
            }}
            value={documentNumber}
            className="input-form"
            type="text"
            placeholder="numero de documento"
            maxLength={10}
            required
          />
          <input
            onChange={(e) => {
              setDateBorn(e.target.value);
            }}
            value={dateBorn}
            className="input-form"
            type="date"
            placeholder="Fecha de nacimiento"
            required
          />
        </div>
        <div className="container-buttons">
          <Button
            onAction={() => {
              validateBasicData();
            }}
            tittle={"Siguiente"}
          />
          <Button
            onAction={() => {
              setCurrentStep(currentStep - 1);
            }}
            tittle={"atras"}
          />
        </div>
      </>
    );
  };

  const basicDataEnterprise = () => {
    return (
      <>
        <div className="inputs-steps">
          <p>Datos basicos.</p>
          <input
            onChange={(e) => {
              setCompanyName(e.target.value);
            }}
            value={companyName}
            className="input-form"
            type="text"
            placeholder="Nombre de la empresa."
            required
          />
          <input
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            value={description}
            className="input-form"
            type="text"
            placeholder="Descripcion"
            required
          />
          <input
            onChange={(e) => {
              setNit(e.target.value);
            }}
            value={nit}
            className="input-form"
            type="text"
            placeholder="Nit"
            maxLength={10}
            required
          />

          <input
            onChange={(e) => {
              setCompanyAddress(e.target.value);
            }}
            value={companyAddress}
            className="input-form"
            type="text"
            placeholder="Dirreccion de la empresa"
            required
          />
          <input
            onChange={(e) => {
              setCompanyPhoneNumber(e.target.value);
            }}
            value={companyPhoneNumber}
            className="input-form"
            type="text"
            placeholder="Telefono de contacto"
            maxLength={11}
            required
          />
          <input
            onChange={(e) => {
              setNumberOfEmployees(e.target.value);
            }}
            value={numberOfEmployees}
            className="input-form"
            type="text"
            placeholder="Numero de empleados "
            required
          />
        </div>

        <div className="container-buttons">
          <Button
            onAction={() => {
              validateBasicDataEnterprise();
            }}
            tittle={"Siguiente"}
          />
          <Button
            onAction={() => {
              setCurrentStep(currentStep - 1);
            }}
            tittle={"atras"}
          />
        </div>
      </>
    );
  };

  const aboutUser = () => {
    return (
      <>
        <div className="inputs-steps">
          <p>Cuentanos un poco sobre ti</p>

          <select
            onChange={(e) => {
              setGenre(Number(e.target.value));
            }}
            value={genre}
            className="input-form"
            placeholder="Genero"
          >
            <option value={genre}>{genreEnum[genre]}</option>
            {Object.keys(genreEnum).map((m, i) => {
              return (
                <option key={i} value={m}>
                  {genreEnum[m]}
                </option>
              );
            })}
          </select>

          <select
            onChange={(e) => {
              setCurrentJob(Number(e.target.value));
            }}
            value={currentJob}
            className="input-form"
            placeholder="ocupacion"
          >
            <option value={currentJob}>{ocupationsEnum[currentJob]}</option>
            {Object.keys(ocupationsEnum).map((m, i) => {
              return (
                <option key={i} value={m}>
                  {ocupationsEnum[m]}
                </option>
              );
            })}
          </select>

          <select
            onChange={(e) => {
              setMaritalStatus(Number(e.target.value));
            }}
            value={maritalStatus}
            className="input-form"
          >
            <option value={maritalStatus}>
              {maritalStatusEnum[maritalStatus]}
            </option>

            {Object.keys(maritalStatusEnum).map((m, i) => {
              return (
                <option key={i} value={m}>
                  {maritalStatusEnum[m]}
                </option>
              );
            })}
          </select>

          {/* Campo para Ingresos Mensuales */}
          <input
            onChange={(e) => {
              const n = Number(e.target.value.replaceAll(".", ""));
              if (!isNaN(n)) {
                setMonthlyIncome(formatNumber(n));
              }
            }}
            value={monthlyIncome}
            className="input-form"
            type="text"
            placeholder="Ingresos mensuales"
          />
        </div>

        <div className="container-buttons">
          <Button
            onAction={() => {
              validateAboutUserData();
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
      </>
    );
  };

  const userLocation = () => {
    return (
      <>
        <div className="inputs-steps">
          <p>Datos de contacto.</p>
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
            maxLength={10}
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

        <div className="container-buttons">
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
      </>
    );
  };

  const setupAccount = () => {
    return (
      <>
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
            maxLength={10}
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
            maxLength={20}
            placeholder="Contraseña mínimo 8 caracteres"
            required
          />
          <input
            onChange={(e) => {
              setPassword2(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") validateSetupData();
            }}
            value={password2}
            id="registro-contraseña-input-2"
            className="input-form"
            type="password"
            maxLength={20}
            placeholder="Confirmar contraseña"
            required
          />
        </div>
        {loader ? <span className="loader form-loader"></span> : <></>}
        <div className="container-buttons">
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
      </>
    );
  };

  const setupPinCard = () => {
    return (
      <>
        <div className="inputs-steps">
          <p>
            Ingresa un numero de 4 dígitos para tu tarjeta de débito. Asegúrate
            de que tu PIN sea fácil de recordar.
          </p>

          <input
            onChange={(e) => {
              setCardPin(e.target.value);
            }}
            value={cardPin}
            id="registro-contraseña-input"
            className="input-form"
            type="password"
            placeholder="Pin"
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
        <div className="container-buttons">
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
      </>
    );
  };

  const confirmAccount = () => {
    return (
      <>
        <div className="inputs-steps">
          <p>
            Necesitamos verificar tu correo, Ingresa el codigo de verificacion
            que hemos enviado a tu correo electronico
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
        <div className="container-buttons">
          <Button
            onAction={() => {
              confirmAccountHandler();
            }}
            tittle={"Confirmar"}
          />
          {/* <Button
            onAction={() => {
              setCurrentStep(currentStep - 1);
            }}
            tittle={"Volver - dev"}
          /> */}
        </div>
      </>
    );
  };

  useEffect(() => {
    let steps = [
      userTypeCheck,
      basicData,
      aboutUser,
      userLocation,
      setupPinCard,
      setupAccount,
      confirmAccount,
    ];
    if (isBusiness.current) {
      steps = [userTypeCheck, basicDataEnterprise, ...steps.slice(1)];
    }

    setSteps(steps);
  }, [
    companyName,
    companyAddress,
    companyPhoneNumber,
    numberOfEmployees,
    firstName,
    lastName,
    documentNumber,
    documentTypeId,
    dateBorn,
    phoneNumber,
    monthlyIncome,
    currentJob,
    username,
    currentStep,
    password,
    password2,
    address,
    cardPin,
    cardPin2,
    email,
    description,
    maritalStatus,
    nit,
    genre,
    verifyCode,
  ]);
  return (
    <>
      <div className="container_signup">
        <IoArrowBack
          className="back-icon"
          onClick={() => navigate("/forms")}
          size={30}
        />

        <RiMoneyDollarCircleFill className="icon-logo-form" size={30} />

        <div className="header-form">
          <div className="text">Empieza aqui</div>
        </div>

        <div className="inputs">
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
