import "./header.css";
import { useNavigate } from "react-router-dom";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { useEffect, useState } from "react";
const Header = () => {
  const [validateTransaction, setValidateTransaction] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const navigate = useNavigate();
  useEffect(() => {}, []);
  return (
    <header className="header">
      <div className="logo">
        <RiMoneyDollarCircleFill size={40} />
        <h1>AppBank</h1>
      </div>

      <div className="header-actions">
        <div
          onMouseEnter={() => setValidateTransaction(true)}
          className="validate-transaction cta-button"
        >
          Verificar transaccion
          {validateTransaction ? (
            <div
              onMouseLeave={() => setValidateTransaction(false)}
              className="container-transaction-id"
            >
              <input
                onChange={(e) => setTransactionId(e.target.value)}
                type="text"
                placeholder="ID o referenecia"
                className="input-transaction-id"
              />
              <div
                onClick={() => {
                  navigate(`/transfer/details/${transactionId}`);
                  setTransactionId("");
                }}
                className="button-verify-transaction"
              >
                Verificar
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>

        <button onClick={() => navigate("/forms")} className="cta-button">
          Iniciar{" "}
        </button>
        <button className="cta-button">Nosotros</button>
      </div>
    </header>
  );
};

export default Header;
