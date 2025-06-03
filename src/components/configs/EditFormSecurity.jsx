import { useEffect, useState } from "react";
import "./editformsecurity.css";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";

export default function EditFormSecurity() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [oldPin, setOldPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const { updatePassword } = useUser();
  const navigate = useNavigate();

  const handlerSendChangedPassword = () => {
    const regex = /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    if (!regex.test(newPassword)) {
      return alert(
        "La contraseña de tener almenos: 8 caracteres, 1 simbolo, 1 letra mayuscula"
      );
    }

    updatePassword(
      (data, err) => {
        if (err) {
          return alert(err);
        }
        setNewPassword("");
        setOldPassword("");
        alert("Contraseña actualizada.");
      },
      {
        newPass: newPassword,
        currentPass: oldPassword,
      }
    );
  };

  useEffect(() => {}, []);

  return (
    <div className="container-edit-security">
      <IoArrowBack
        className="back-icon"
        onClick={() => navigate("/config")}
        size={30}
      />
      <div className="container-form-security">
        <h1>Seguridad</h1>
        <p>Contraseña</p>
        <div className="container-input-width-label">
          <label htmlFor="input_email">Contraseña actual</label>
          <input
            id="input_email"
            onChange={(e) => setOldPassword(e.target.value)}
            type="password"
            className="input-field"
            value={oldPassword}
          />
        </div>
        <div className="container-input-width-label">
          <label htmlFor="input_email">Contraseña nueva</label>
          <input
            id="input_email"
            onChange={(e) => setNewPassword(e.target.value)}
            type="password"
            className="input-field"
            value={newPassword}
          />
        </div>

        <div
          id="button_change_password"
          className="button-edit-profile"
          onClick={handlerSendChangedPassword}
        >
          Cambiar
        </div>

        <p>Pin</p>
        <div className="container-input-width-label">
          <label htmlFor="input_pin">Pin actual</label>
          <input
            id="input_pin"
            type="password"
            onChange={(e) => setOldPin(e.target.value)}
            className="input-field"
            value={oldPin}
          />
        </div>
        <div className="container-input-width-label">
          <label htmlFor="input_npin">Pin nuevo</label>
          <input
            id="input_npin"
            type="password"
            onChange={(e) => setNewPin(e.target.value)}
            className="input-field"
            value={newPin}
          />
        </div>
        <div
          id="button_change_password"
          className="button-edit-profile"
          onClick={handlerSendChangedPassword}
        >
          Cambiar
        </div>
      </div>
    </div>
  );
}
