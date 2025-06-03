import { useState, useEffect } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./editformblock.css";

export default function EditFormBlocks() {
  const [accounts, setAccounts] = useState([]);
  const [cards, setCards] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
    setAccounts(userInfo.products.accounts);
    setCards(userInfo.products.cards);
  }, []);

  const switchAccountHandler = (id) => {
    setAccounts(
      accounts.map((a) => {
        if (a.id === id) {
          a.state = !a.state;
        }
        return a;
      })
    );
  };

  const switchCardHandler = (id) => {
    setCards(
      cards.map((a) => {
        if (a.id === id) {
          a.state = !a.state;
        }
        return a;
      })
    );
  };

  return (
    <div className="container-edit-blocks">
      <IoArrowBack
        className="back-icon"
        onClick={() => navigate("/config")}
        size={30}
      />
      <div className="container-form-blocks">
        <h1>Bloqueos</h1>

        {/* Sección de Cuentas */}
        <div className="container-info-blocks">
          <h2>Cuentas</h2>
          <p>
            Si bloqueas una cuenta debes tener en cuenta que no podras recibir
            ni transferir dinero hasta volver a activarla.
          </p>
        </div>
        <div className="container-accounts">
          {accounts.length === 0 ? (
            <p>No tienes cuentas disponibles.</p>
          ) : (
            accounts.map((account) => (
              <div key={account.id} className="account-item">
                <p>
                  <strong>ID:</strong> {account.id}
                </p>

                <p>
                  <strong>Saldo:</strong> {account.balance}
                </p>

                <label className="switch">
                  <input
                    type="checkbox"
                    checked={account.state}
                    onChange={() => switchAccountHandler(account.id)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            ))
          )}
        </div>

        <div className="container-info-blocks">
          <h2>Tarjetas</h2>
          <p>
            Si bloqueas una tarjeta debes tener en cuenta que no podras usarla
            para realizar pagos en linea y fisicos hasta volver a activarla
          </p>
        </div>
        <div className="container-cards">
          {cards.length === 0 ? (
            <p>No tienes tarjetas disponibles.</p>
          ) : (
            cards.map((card) => (
              <div key={card.id} className="card-item">
                <p>
                  <strong>ID:</strong> {card.id}
                </p>
                <p>
                  <strong>Tipo:</strong> {card.cardType}
                </p>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={card.state}
                    onChange={() => switchCardHandler(card.id)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
