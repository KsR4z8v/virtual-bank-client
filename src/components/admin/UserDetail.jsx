import { useState } from "react";
import "./userdetail.css";
import useUser from "../../hooks/useUser";
import {
  genreEnum,
  maritalStatusEnum,
  ocupationsEnum,
  userStatus,
} from "../../utils/enums";

const UserDetail = () => {
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const { getUserData } = useUser();

  const fetchUserData = async () => {
    getUserData((data, err) => {
      if (err) {
        return alert("Error al traer informacion del usuario");
      }
      setUserData(data.data);
    }, userId);
  };

  return (
    <div className="user-detail">
      <h2>Usuario</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Ingrese el ID del usuario"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button onClick={fetchUserData}>Buscar</button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {userData && (
        <div className="user-info">
          <div className="user-basic-data">
            <h3 className="title-section">Información del Usuario</h3>
            <p>
              <strong>ID:</strong> {userData.user.id}
            </p>
            <p>
              <strong>Nombre:</strong>{" "}
              {`${userData.user.data.firstName} ${userData.user.data.lastName}`}
            </p>
            <p>
              <strong>Correo Electrónico:</strong> {userData.user.email}
            </p>
            <p>
              <strong>Estado:</strong> {userStatus[userData.user.state]}
            </p>
            <p>
              <strong>Dirección:</strong> {userData.user.address}
            </p>
            <p>
              <strong>Teléfono:</strong> {userData.user.phoneNumber}
            </p>
            <p>
              <strong>Ocupacion:</strong>{" "}
              {ocupationsEnum[userData.user.data.currentJob]}
            </p>
            <p>
              <strong>Genero:</strong> {genreEnum[userData.user.data.genre]}
            </p>
            <p>
              <strong>Estado civil:</strong>{" "}
              {maritalStatusEnum[userData.user.data.maritalStatus]}
            </p>
            <p>
              <strong>Ingresos al:</strong> {userData.user.data.monthlyIncome}
            </p>
            <p>
              <strong>Número de Documento:</strong>{" "}
              {userData.user.data.documnentNumber}
            </p>
            <p>
              <strong>Fecha de Nacimiento:</strong>{" "}
              {new Date(userData.user.data.dateBorn).toLocaleDateString()}
            </p>
          </div>
          {userData?.company ? (
            <div className="company-basic-data">
              <h3 className="title-section">Información de la Compañía</h3>
              <p>
                <strong>Nombre:</strong> {userData.company.name}
              </p>
              <p>
                <strong>Dirección:</strong> {userData.company.address}
              </p>
              <p>
                <strong>Teléfono:</strong> {userData.company.phoneNumber}
              </p>
            </div>
          ) : (
            <></>
          )}

          <div className="products-data">
            <h3 className="title-section">Productos</h3>
            <h4>Cuentas</h4>
            {userData.products.accounts.map((account) => (
              <div key={account.id} className="account-item">
                <p>
                  <strong>ID:</strong> {account.id}
                </p>

                <p>
                  <strong>Saldo:</strong> {account.balance}
                </p>

                <label className="switch">
                  <input type="checkbox" checked={account.state} />
                  <span className="slider"></span>
                </label>
              </div>
            ))}

            <h4>Tarjetas</h4>
            {userData.products.cards.map((card) => (
              <div key={card.id} className="card-item">
                <p>
                  <strong>ID:</strong> {card.id}
                </p>
                <p>
                  <strong>Tipo:</strong> {card.cardType}
                </p>
                <label className="switch">
                  <input type="checkbox" checked={card.state} />
                  <span className="slider"></span>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetail;
