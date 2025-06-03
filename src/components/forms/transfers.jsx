import { useEffect, useState } from "react";
import useTransfer from "../../hooks/useTransfer";
import { useNavigate } from "react-router-dom";
import "./transfers.css";
import { IoArrowBack } from "react-icons/io5";

import formatNumber from "../../utils/formatNumber";

function Transfers() {
  const [toProduct, setToProduct] = useState("");
  const [fromProduct, setFromProduct] = useState("");
  const [description, setDescription] = useState("");
  const [pin, setPin] = useState("");
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState("");

  const { transfer } = useTransfer();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    transfer(
      (data, error) => {
        if (error) {
          return alert(error);
        }
        alert("Se ha realizado la transferencia con exito.");
        navigate(`details/${data.data.transactionId}`);
      },
      {
        userId,
        description,
        toProduct,
        fromProduct,
        pin,
        amount: Number(amount.replaceAll(".", "")),
      }
    );
  };

  useEffect(() => {
    const userInfoFound = JSON.parse(window.localStorage.getItem("userInfo"));
    const user = JSON.parse(window.localStorage.getItem("session"));
    setUserId(user.userId);
    setFromProduct(userInfoFound.products.accounts[0].id);
  }, []);

  return (
    <div className="transfers-container">
      <IoArrowBack
        className="back-icon"
        onClick={() => navigate("/lobby")}
        size={30}
      />
      <div className="container-form-transfers">
        <form onSubmit={handleSubmit}>
          <h2>Realizar Transferencia</h2>
          <div className="form-group">
            <label>De producto:</label>
            <input
              type="text"
              className="input-form-transfer"
              name="transferFrom"
              value={fromProduct}
              onChange={(e) => {
                setFromProduct(e.target.value);
              }}
              disabled
            />
          </div>

          <div className="form-group">
            <label>Número de Cuenta destino:</label>
            <input
              type="text"
              className="input-form-transfer"
              name="accountNumber"
              value={toProduct}
              onChange={(e) => {
                setToProduct(e.target.value);
              }}
              required
            />
          </div>
          <div className="form-group">
            <label>Descripción:</label>
            <textarea
              type="text"
              className="input-form-transfer text-area"
              name="description"
              value={description}
              placeholder="informacion adicional"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label>Monto a Transferir:</label>
            <input
              type="text"
              className="input-form-transfer"
              name="amount"
              value={amount}
              placeholder="0"
              onChange={(e) => {
                const n = Number(e.target.value.replaceAll(".", ""));
                if (!isNaN(n)) {
                  setAmount(formatNumber(n));
                }
              }}
              required
            />
          </div>
          <div className="form-group">
            <label>Pin: </label>
            <input
              type="password"
              className="input-form-transfer"
              name="name"
              value={pin}
              placeholder="pin"
              onChange={(e) => {
                setPin(e.target.value);
              }}
              required
              maxLength={4}
            />
          </div>
          <div className="form-actions">
            <button type="submit">Transferir</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Transfers;
