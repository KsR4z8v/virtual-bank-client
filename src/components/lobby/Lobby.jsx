import { useState, useEffect } from "react";
import { IoSettings, IoRadio } from "react-icons/io5";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import useTransaction from "../../hooks/useTransaction";
import formatNumber from "../../utils/formatNumber";
import useUser from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import download from "js-file-download";
import { IoOpenOutline } from "react-icons/io5";
import "./Lobby.css";

const Lobby = () => {
  const [account, setAccount] = useState({});
  const [card, setCard] = useState({});
  const [user, setUser] = useState({});
  const [transactions, setTransactions] = useState();
  const navigate = useNavigate();
  const { getUserData, logout } = useUser();
  const { getMovements } = useTransaction();

  const handlerLogout = () => {
    logout((data, err) => {
      if (err) {
        return alert(
          "Hubo un error al tratar de cerrar sesion, Intentalo de nuevo."
        );
      }
      window.localStorage.clear();
      navigate("/");
    }, user.id);
  };

  useEffect(() => {
    const session = window.localStorage.getItem("session");
    if (!session) {
      navigate("/");
    }
    const userId = JSON.parse(session).userId;
    getUserData((data, error) => {
      if (error) {
        return alert(error);
      }
      setUser(data.data.user);
      setCard(data.data.products.cards[0]);
      setAccount(data.data.products.accounts[0]);
      window.localStorage.setItem("userInfo", JSON.stringify(data.data));
      getMovements((data, error) => {
        if (error) {
          return alert("Error obteniendo el historial de transferencia.");
        }
        setTransactions(data.data);
      }, data.data.products.accounts[0].id);
    }, userId);
  }, []);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <RiMoneyDollarCircleFill size={40} />
        <div className="user-info">
          <span className="user-name">
            Bienvenido, {`${user.username ?? ""}`}
          </span>
        </div>
        <div className="navbar">
          <button
            className="menu-button"
            onClick={() => {
              navigate("/transfer");
            }}
          >
            Transferir
          </button>
          <div className="dropdown-menu">
            <button className="menu-button">Menu</button>
            <div className="menu-content">
              <button
                className="button-text"
                onClick={() => navigate("/config")}
              >
                <IoSettings />
                Ajustes
              </button>
              <button className="button-text" onClick={() => handlerLogout()}>
                <IoSettings />
                Cerrar sesion
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className="info-container">
        <div className="balance-info">
          <h2>Saldo total</h2>
          <p>
            <b>{`$${formatNumber(account.balance ?? "0.0")}`}</b>
          </p>
          <p>
            <b>Número de cuenta:</b> {account.id ?? ""}
          </p>
        </div>
        <div className="credit-card">
          <div className="card-header">
            <div className="card">
              <h2 className="card-name">AppBank</h2>
              <IoRadio size={30} className="radio-icon" />
              <p className="card-account">{card.id ?? "-"}</p>
            </div>
          </div>
          <div className="card-balance">
            <h3>{`${user.data?.firstName ?? "-"}  ${
              user.data?.lastName ?? ""
            }`}</h3>
            <h4>cvc: {card.cvc ?? "000"}</h4>
            <h4>{`${
              card.expiredAt ? new Date(card.expiredAt).getMonth() : "00"
            }/${
              card.expiredAt
                ? new Date()?.getFullYear().toString().slice(1)
                : "00"
            }`}</h4>
          </div>
        </div>
      </div>
      <div className="transaction-history">
        <div
          className="butto-generate-extract"
          onClick={async () => {
            const resp = await fetch(
              import.meta.env.VITE_API_URL +
                `/product/account/${account.id}/extract`
            );

            if (resp.ok) {
              const blob = await resp.blob();
              download(
                blob,
                `Extracto_${account.id}_${
                  user.data.documentNumber
                }_${new Date().toLocaleString()}.pdf`
              );
            } else {
              alert("Error");
            }
          }}
        >
          Generar extracto
        </div>
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
                <span>{t.title}</span>
                <span>
                  <b> {t.transactionId} </b>
                  <IoOpenOutline
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      navigate(`/transfer/details/${t.transactionId}`)
                    }
                  />
                </span>
                <span>{new Date(t.createdAt).toLocaleString()}</span>
                <span
                  style={{
                    color: t.amount > 0 ? "green" : "red",
                  }}
                >
                  <b> {`$${formatNumber(Math.abs(t.amount))}`}</b>
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
