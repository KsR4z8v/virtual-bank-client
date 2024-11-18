import React, { useState } from 'react';
import "./transfers.css";

function Transfers() {
  const [transferData, setTransferData] = useState({
    accountNumber: '',
    transferFrom: '',
    transferTo: '',
    description: '',
    amount: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransferData({
      ...transferData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Transferencia realizada:', transferData);
  };

  return (
    <div className="transfers-container">
      <h2>Realizar Transferencia</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Número de Cuenta:</label>
          <input
            type="text"
            name="accountNumber"
            value={transferData.accountNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Desde (Ubicación):</label>
          <input
            type="text"
            name="transferFrom"
            value={transferData.transferFrom}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Hacia (Ubicación):</label>
          <input
            type="text"
            name="transferTo"
            value={transferData.transferTo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Descripción:</label>
          <input
            type="text"
            name="description"
            value={transferData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Monto a Transferir:</label>
          <input
            type="number"
            name="amount"
            value={transferData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit">Transferir</button>
        </div>
      </form>
    </div>
  );
}

export default Transfers;
