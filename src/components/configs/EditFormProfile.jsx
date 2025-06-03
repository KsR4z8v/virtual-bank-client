import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import { IoArrowBack } from "react-icons/io5";
import "./editformprofile.css";
import {
  maritalStatusEnum,
  ocupationsEnum,
  genreEnum,
  documentTypesEnum,
} from "../../utils/enums";
import { formatNumber } from "chart.js/helpers";

export default function EditFormProfile() {
  const [isEnterprise, setIsEnterprise] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [objectParams, setParams] = useState({});

  const navigate = useNavigate();
  const { deleteAccount, updateUserInfo } = useUser();

  const deleteAccountHandler = () => {
    const userId = JSON.parse(window.localStorage.getItem("session")).userId;
    deleteAccount((data, error) => {
      if (error) {
        return alert(error);
      }
      window.localStorage.removeItem("session");
      navigate("/");
    }, userId);
  };

  const updateUserInfoHandler = () => {
    updateUserInfo((data, err) => {
      if (err) {
        return alert(err);
      }
      alert("Datos actualizados correctamente.");
    }, objectParams);
  };

  useEffect(() => {
    const localUserInfo = window.localStorage.getItem("userInfo");
    if (!localUserInfo) {
      navigate("/");
    }
    const userInfo = JSON.parse(localUserInfo);
    setIsEnterprise(userInfo.company !== null);
    const userDataInfo = userInfo.user;
    setUserInfo({
      username: userDataInfo.username,
      email: userDataInfo.email,
      company: userInfo.company,
      ...userDataInfo.data,
    });
  }, []);

  return (
    <div className="container-edit-profile">
      <div className="form-edit-profile">
        <IoArrowBack
          className="back-icon"
          onClick={() => navigate("/config")}
          size={30}
        />

        <div className="container-edit-info">
          <h1>Datos personales</h1>
          <div className="container-input-width-label">
            <label htmlFor="input_names">Nombres</label>
            <input
              id="input_names"
              type="text"
              value={userInfo.firstName}
              className="input-field"
              placeholder="Nombres"
              disabled
            />
          </div>
          <div className="container-input-width-label">
            <label htmlFor="input_names">Apellidos</label>
            <input
              id="input_names"
              type="text"
              disabled
              value={userInfo.lastName}
              className="input-field"
              placeholder="Apellidos"
            />
          </div>

          <div className="container-input-width-label">
            <label htmlFor="input-birthday"> Fecha nacimiento</label>
            <input
              id="input-birthday"
              value={userInfo.dateBorn?.split("T")[0]}
              type="date"
              disabled
              className="input-field"
            />
          </div>
          <div className="container-input-width-label">
            <label htmlFor="input_email">Tipo de documento</label>
            <input
              id="input_email"
              type="email"
              className="input-field"
              disabled
              value={documentTypesEnum[userInfo.documentTypeId]}
              placeholder="Tipo de documento"
            />
          </div>
          <div className="container-input-width-label">
            <label htmlFor="input_username">Documento</label>
            <input
              disabled
              id="input_username"
              type="text"
              className="input-field"
              value={userInfo.documentNumber}
              placeholder="Documento"
            />
          </div>
          <div className="container-input-width-label">
            <label htmlFor="input_username">Nombre de usuario</label>
            <input
              disabled
              id="input_username"
              type="nickname"
              className="input-field"
              value={userInfo.username}
              placeholder="Username"
            />
          </div>
          <div className="container-input-width-label">
            <label htmlFor="input_email">Correo Electronico</label>
            <input
              id="input_email"
              type="email"
              className="input-field"
              disabled
              value={userInfo.email}
              placeholder="Correo electrónico"
            />
          </div>
          <div className="container-input-width-label">
            <label htmlFor="input_phone">Numero celular</label>
            <input
              id="input_phone"
              type="email"
              onChange={(e) => {
                const aux = objectParams;
                const aux_ = userInfo;
                const value = e.target.value;
                aux.phoneNumber = value;
                aux_.phoneNumber = value;
                setUserInfo({ ...aux_ });
                setParams({ ...aux });
              }}
              className="input-field"
              value={userInfo.phoneNumber}
              placeholder="Celular"
            />
          </div>

          <div className="container-input-width-label">
            <label htmlFor="input_email">Genero</label>
            <select
              onChange={(e) => {
                const aux = objectParams;
                const aux_ = userInfo;
                const value = Number(e.target.value);
                aux.genre = value;
                aux_.genre = value;
                setUserInfo({ ...aux_ });
                setParams({ ...aux });
              }}
              value={userInfo.genre}
              className="input-field"
              placeholder="ocupacion"
            >
              <option value={userInfo.genre}>
                {genreEnum[userInfo.genre]}
              </option>
              {Object.keys(genreEnum).map((m, i) => {
                return (
                  <option key={i} value={m}>
                    {genreEnum[m]}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Campo para Ocupación */}
          <div className="container-input-width-label">
            <label htmlFor="input_email">Ocupacion</label>
            <select
              onChange={(e) => {
                const aux = objectParams;
                const aux_ = userInfo;
                const value = Number(e.target.value);
                aux.currentJob = value;
                aux_.currentJob = value;
                setUserInfo({ ...aux_ });
                setParams({ ...aux });
              }}
              value={userInfo.currentJob}
              className="input-field"
              placeholder="ocupacion"
            >
              <option value={userInfo.currentJob}>
                {ocupationsEnum[userInfo.currentJob]}
              </option>
              {Object.keys(ocupationsEnum).map((m, i) => {
                return (
                  <option key={i} value={m}>
                    {ocupationsEnum[m]}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Campo para Estado Civil */}
          <div className="container-input-width-label">
            <label htmlFor="input_email">Estado civil</label>
            <select
              onChange={(e) => {
                const aux = objectParams;
                const aux_ = userInfo;
                const value = Number(e.target.value);
                aux.maritalStatus = value;
                aux_.maritalStatus = value;
                setUserInfo({ ...aux_ });
                setParams({ ...aux });
              }}
              value={userInfo.maritalStatus}
              className="input-field"
            >
              <option value={userInfo.maritalStatus}>
                {maritalStatusEnum[userInfo.maritalStatus]}
              </option>

              {Object.keys(maritalStatusEnum).map((m, i) => {
                return (
                  <option key={i} value={m}>
                    {maritalStatusEnum[m]}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="container-input-width-label">
            <label htmlFor="input_monthlyIncome">Ingresos</label>
            <input
              id="input_monthlyIncome"
              type="text"
              onChange={(e) => {
                const aux = objectParams;
                const aux_ = userInfo;
                const value = e.target.value.replaceAll(".", "");
                aux.monthlyIncome = value;
                aux_.monthlyIncome = value;
                setUserInfo({ ...aux_ });
                setParams({ ...aux });
              }}
              className="input-field"
              value={formatNumber(userInfo.monthlyIncome)}
              placeholder="0"
            />
          </div>

          <div className="container-input-width-label">
            <label htmlFor="input_address">Direccion de residencia</label>
            <input
              id="input_address"
              type="text"
              onChange={(e) => {
                const aux = objectParams;
                const aux_ = userInfo;
                aux.address = e.target.value;
                aux_.address = e.target.value;
                setUserInfo({ ...aux_ });
                setParams({ ...aux });
              }}
              className="input-field"
              value={userInfo.address}
            />
          </div>

          {isEnterprise ? (
            <>
              <label htmlFor="">Datos de la empresa</label>
              <div className="container-input-width-label">
                <label htmlFor="input_ent">Nit</label>
                <input
                  id="input_ent"
                  type="text"
                  className="input-field"
                  disabled
                  value={userInfo.company.nit}
                  placeholder=""
                />
              </div>
              <div className="container-input-width-label">
                <label htmlFor="input_ent">Nombre</label>
                <input
                  id="input_ent"
                  type="text"
                  className="input-field"
                  disabled
                  value={userInfo.company.name}
                  placeholder="Nombre de la empresa"
                />
              </div>
              <div className="container-input-width-label">
                <label htmlFor="input_ent">Numero de contacto</label>
                <input
                  id="input_ent"
                  type="email"
                  className="input-field"
                  value={userInfo.company.phoneNumber}
                  placeholder="Celular"
                />
              </div>
              <div className="container-input-width-label">
                <label htmlFor="input_ent">Descripcion </label>
                <input
                  id="input_ent"
                  type="text"
                  className="input-field"
                  value={userInfo.company.description}
                  placeholder=""
                />
              </div>

              <div className="container-input-width-label">
                <label htmlFor="input_ent">Numero de trabajadores</label>
                <input
                  id="input_ent"
                  type="text"
                  className="input-field"
                  value={userInfo.company.numberOfEmployees}
                  placeholder=""
                />
              </div>
              <div className="container-input-width-label">
                <label htmlFor="input_ent">Direccion</label>
                <input
                  id="input_ent"
                  type="text"
                  className="input-field"
                  disabled
                  value={userInfo.company.address}
                  placeholder=""
                />
              </div>
            </>
          ) : (
            <></>
          )}

          <div className="button-edit-profile" onClick={updateUserInfoHandler}>
            Actualizar datos
          </div>
        </div>
        <hr className="container-edit-border" />
        <div
          id="button_change_password"
          className="button-edit-profile button-delete-account"
          onClick={() => deleteAccountHandler()}
        >
          Eliminar cuenta
        </div>
      </div>
    </div>
  );
}
