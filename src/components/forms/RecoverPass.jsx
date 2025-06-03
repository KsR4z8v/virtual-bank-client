import { useState } from "react";
import useUser from "../../hooks/useUser";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import "./recoverpass.css";

const RecoverPass = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { recoverPassword } = useUser();
  const navigate = useNavigate();

  const handleRecovery = (e) => {
    e.preventDefault();
    recoverPassword((data, error) => {
      if (error) {
        return setMessage(error);
      }
      setMessage(`Se envió el enlace para recuperar la contraseña a ${email}`);
    }, email);
  };

  return (
    <div className="Recover_password">
      <IoArrowBack
        className="back-icon"
        onClick={() => navigate("/forms")}
        size={30}
      />
      <RiMoneyDollarCircleFill className="icon-logo-form" size={30} />
      <div className="header-form">
        <h2 className="text">Recuperar</h2>
      </div>
      <div className="inputs">
        <input
          type="email"
          id="email"
          className="input-form"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo Electrónico"
          required
        />
        {message && <p>{message}</p>}
        <div className="submit">
          <div onClick={handleRecovery} className="submit_recover">
            Enviar
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default RecoverPass;
