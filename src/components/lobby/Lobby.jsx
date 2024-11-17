import { useState, useEffect } from "react";
import { IoBuildOutline, IoSettings, IoRadio } from "react-icons/io5";
import { FaMoneyCheckAlt } from "react-icons/fa";
import "./Lobby.css";
import useTransaction from "../../hooks/useTransaction";
import { formatNumber } from "chart.js/helpers";
import useUser from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";

const Lobby = () => {
  const [account, setAccount] = useState({});
  const [card, setCard] = useState({});
  const [user, setUser] = useState({});
  const [transactions, setTransactions] = useState();
  const navigate = useNavigate();
  const { getUserData, deleteAccount } = useUser();
  const { getHistory } = useTransaction();

  const deleteAccountHandler = () => {
    const userId = JSON.parse(window.sessionStorage.getItem("session")).userId;
    deleteAccount((data, error) => {
      if (error) {
        return alert(error);
      }
      window.sessionStorage.removeItem("session");
      navigate("/");
    }, userId);
  };

  useEffect(() => {
    const userId = JSON.parse(window.sessionStorage.getItem("session")).userId;
    getUserData((data, error) => {
      if (error) {
        return alert(error);
      }
      setUser(data.data.user);
      setCard(data.data.products.card);
      setAccount(data.data.products.account);

      getHistory((data, error) => {
        if (error) {
          return alert("Error obteniendo el historial de transferencia.");
        }
        setTransactions(data.data);
      }, data.data.products.account.id);
    }, userId);
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("session");
    navigate("/");
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <FaMoneyCheckAlt size={40} />
        <div className="user-info">
          <h1>AppBank</h1>
          <span className="user-name">Bienvenido, {`${user.username}`}</span>
          <div className="dropdown-menu">
            <button className="menu-button">Menu</button>
            <div className="menu-content">
              <button
                className="button-text"
                onClick={() => console.log("configuraciones")}
              >
                <IoBuildOutline />
                Configuraciones
              </button>

              <button className="button-text" onClick={handleLogout}>
                <IoSettings />
                Cerrar Sesion
              </button>
              <button
                style={{ backgroundColor: "red" }}
                className="button-text"
                onClick={() => {
                  deleteAccountHandler();
                }}
              >
                Eliminar cuenta
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className="info-container">
        <div className="balance-info">
          <h2>Saldo total</h2>
          <p>{`$${formatNumber(account.balance)}`}</p>
          <p>Número de cuenta: {account.id}</p>
        </div>
        <div className="credit-card">
          <div className="card-header">
            <div className="card">
              <h2 className="card-name">AppBank</h2>
              <IoRadio size={30} className="radio-icon" />
              <p className="card-account">{card.id}</p>
            </div>
          </div>
          <div className="card-balance">
            <h3>{`${user.data?.firstName}  ${user.data?.lastName}`}</h3>
            <h4>cvc: {card.cvc}</h4>
            <h4>{`${new Date(card.expiredAt).getMonth()}/${new Date(
              card.expiredAt
            )
              .getFullYear()
              .toString()
              .slice(1)}`}</h4>
          </div>
        </div>
      </div>
      <div className="transaction-history">
        <h2>Historial de Transacciones</h2>
        <li className="transaction-item transaction-header">
          <span>Descripcion</span>
          <span>Referencia</span>
          <span>Fecha</span>
          <span>Monto</span>
        </li>
        <ul className="transaction-list">
          {transactions ? (
            transactions.map((t, i) => (
              <li key={i} className="transaction-item item">
                <span>{t.description}</span>
                <span> {t.id}</span>
                <span>{new Date(t.createdAt).toLocaleString()}</span>
                <span
                  style={{
                    color: t.toProduct === account.id ? "green" : "red",
                  }}
                >
                  {`$${formatNumber(t.amount)}`}
                </span>
              </li>
            ))
          ) : (
            <div className="box-loader">
              <span className="loader form-loader"></span>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Lobby;
