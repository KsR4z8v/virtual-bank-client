import { useEffect, useState } from "react";
import useUser from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { useSearchParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import Button from "./Button";
import "./Codeinput.css";

export default function UpdatePass() {
  const [newPassword, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const { resetPassword } = useUser();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const redirectToInit = () => {
    navigate("/");
  };

  const handleSubmit = () => {
    setMessage("");
    if (newPassword.trim() === "" || confirmPassword.trim() === "") {
      return setMessage("Por favor digite una contraseña valida");
    }

    if (newPassword !== confirmPassword) {
      return setMessage("Las contraseñas no coinciden.");
    }
    resetPassword(
      (data, err) => {
        if (err) {
          return setMessage(err);
        }
        navigate("/forms");
      },
      newPassword,
      searchParams.get("t")
    );
  };

  useEffect(() => {
    if (!searchParams.get("t")) {
      redirectToInit();
    }
  }, []);

  return (
    <div className="container_signup">
      <IoArrowBack
        className="back-icon"
        onClick={() => navigate("/forms/recoverpass")}
        size={30}
      />
      <RiMoneyDollarCircleFill className="icon-logo-form" size={30} />
      <div className="header_signup">
        <div className="text text-update-pass">Actualiza tu contraseña</div>
      </div>

      <div className="inputs">
        <label htmlFor="newPassword">Nueva Contraseña</label>
        <input
          type="password"
          id="newPassword"
          className="input-form"
          value={newPassword}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label htmlFor="confirmPassword">Confirmar contraseña</label>
        <input
          type="password"
          id="confirmPassword"
          className="input-form"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <div className="container-buttons">
          <Button
            tittle={"Cambiar contraseña"}
            onAction={() => handleSubmit()}
          />
          {message && <p id="container_error_code">{message}</p>}
        </div>
      </div>
    </div>
  );
}
