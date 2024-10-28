import React, { useState, useEffect } from "react";
import {IoBuildOutline,IoSettings} from "react-icons/io5";
import { FaMoneyCheckAlt } from "react-icons/fa";
import "./Lobby.css";


const Lobby = () => {
  const [balance, setBalance] = useState('');
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [transactions, setTransactions] = useState([]);

  const sampleUsers = [
    { id: 3378, name: "Juan Perez", type: "Usuario", date: "01/01/2024", balance: "$21,700.000" },
    { id: 2333, name: "Maria Gomez", type: "Admin", date: "02/02/2024", balance: "$18,700.000" },
    { id: 3322, name: "Carlos Lopez", type: "Usuario", date: "15/02/2024", balance: "$15,700.000" },
    { id: 4116, name: "Victoria Escobar", type: "Admin", date: "30/03/2024", balance: "$17,700.000" },
    { id: 5988, name: "Daniela Rodas", type: "Usuario", date: "25/04/2024", balance: "$18,100.000" },
  ];

  const sampleTransactions = [
    { id: 20243, type: "Corriente", amount:"$5,600.000", date: "05/05/2024" },
    { id: 50466, type: "Ahorros", amount: "$6,800.000", date: "06/08/2024" },
    { id: 60373, type: "Corriente", amount: "$5,000.000", date: "15/08/2024" },
    { id: 34400, type: "Ahorros", amount: "$2,600.000", date: "20/10/2024"},
    { id: 99444, type: "Corriente", amount: "$1,700.000", date: "5/12/2024"}
  ];

  useEffect(() => {
    const user = sampleUsers[0];
    setBalance(user.balance);
    setId(user.id);
    setName(user.name);

    setTransactions(sampleTransactions);
  }, []);

  const handleLogout = () => {
    console.log("Cerrar sesión");
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
      <FaMoneyCheckAlt size={40}/>
        <div className="user-info">
        <h1>AppBank</h1>
        <span className="user-name">Bienvenido, {name}</span>
          <div className="dropdown-menu">
          <button className="menu-button">Menu</button>
          <div className="menu-content">
        <button className="button-text"onClick={() => console.log('configuraciones')}><IoBuildOutline />Configuraciones</button>
        <button className="button-text"onClick={handleLogout}><IoSettings />Cerrar Sesion</button>
      </div>
    </div>
  </div>
      </header>
      <div className="info-container">
        <div className="credit-card">
          <div className="card-header">
            <div className="circle"></div>
            <div className="card-info">
            <h2 className="card-name">AppBank</h2>
            <p className="card-account">1234 5678 9101 1121</p>
          </div>
        </div>
          <div className="card-balance">
          <h3>Saldo: {balance}</h3>
        </div>
          <div className="card-bar"></div>
        </div>
          <div className="balance-info">
          <h2>Saldo Principal</h2>
          <p>{balance}</p>
          <p>Número de cuenta: {id}</p>
        </div>
    </div>
      <div className="transaction-history">
        <h2>Historial de Transacciones</h2>

        <div className="transaction-header">
          <span className="transaction-column"># Cuenta</span>
          <span className="transaction-column">Tipo de cuenta</span>
          <span className="transaction-column">Monto</span>
          <span className="transaction-column">Fecha</span>
        </div>

        <ul className="transaction-list">
          {transactions.map((transaction) => (
            <li key={transaction.id} className="transaction-item">
              <span>{transaction.id}</span>
              <span>{transaction.type}</span>
              <span>{transaction.amount}</span>
              <span>{transaction.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Lobby;
