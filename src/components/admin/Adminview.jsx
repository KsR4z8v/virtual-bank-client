import React, { useState } from "react";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { IoAccessibility,IoPodium,IoSettings,IoEye,IoFileTrayFullSharp,IoHome,IoSync,IoWarning,IoPower,IoPeople} from "react-icons/io5";
import "./Adminview.css";
import { Bar, Line } from 'react-chartjs-2';
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,PointElement,LineElement,Title,Tooltip,Legend} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Navbar = ({ setActiveSection }) => {
  return (
    <nav className="navbar2">  
      <FaMoneyCheckAlt size={40} />
      <h2>AppBank</h2>
      <ul>
        <li><button onClick={() => setActiveSection('inicio')}><IoHome/> Inicio</button></li>
        <li><button onClick={() => setActiveSection('usuarios')}><IoPeople/> Usuarios</button></li>
        <li><button onClick={() => setActiveSection('transacciones')}><IoSync /> Transacciones</button></li>
        <li><button onClick={() => setActiveSection('reportes')}><IoWarning /> Reportes</button></li>
        <li><button onClick={() => setActiveSection('salir')}><IoPower /> Salir</button></li>
      </ul>
    </nav>
  );
};

export default function Adminview() {
  const [activeSection, setActiveSection] = useState(null);
  const [users, setUsers] = useState([]);
  const [transactions, setTransaction] = useState([]);
  const [reports, setReports] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const [showTransactions, setShowTransactions] = useState(false);
  const [showReports, setShowReports] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [editingReport, setEditingReport] = useState(null);
  const [response, setResponse] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSecurity, setShowSecurity] = useState(false);
  const [showAppearance, setShowAppearance] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  const sampleUsers = [
    { id: 1879, name: "Juan Perez", type: "Usuario", date: "01/01/2024", balance:"21,700.000" },
    { id: 2345, name: "Maria Gomez", type: "Admin", date: "02/02/2024", balance:"18,700.000" },
    { id: 3342, name: "Carlos Lopez", type: "Usuario", date: "15/02/2024", balance:"15,700.000" },
    { id: 4123, name: "Victoria Escobar", type: "Admin", date: "30/03/2024", balance:"17,700.000" },
    { id: 5567, name: "Daniela Rodas", type: "Usuario", date: "25/04/2024", balance:"18,100.000" },
  ];
  
  const sampleTransactions = [
    { id:202, type: "Corriente", amount: "$5,600.000", date: "05/05/2024" },
    { id:504, type: "Ahorros", amount: "$6,800.000", date: "06/08/2024" },
    { id:603, type: "Corriente", amount: "$9,300.000", date: "15/08/2024" },
  ];

  const sampleReports = [
    { id:100, type: "Reporte de Transacciones", date: "20/09/2024" },
    { id:200, type: "Reporte de Usuarios", date: "25/09/2024"},
    { id:300, type: "Errores en el Sistema", date: "09/10/2024"},
  ];
  
  const fetchUsers = () => {
    setUsers(sampleUsers);
    setShowUsers(!showUsers);  
  };

  const fetchTransactions = () => {
    setTransaction(sampleTransactions);
    setShowTransactions(!showTransactions);
  };

  const fetchReports = () => {
    setReports(sampleReports);
    setShowReports(!showReports);
  };
  
  const handleEditUser = (users) => {
    setEditingUser(users);
  };

  const handleEditTransaction = (transactions) => {
    setEditingTransaction(transactions);
  }
  
  const saveUser = (updatedUser) => {
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
    setEditingUser(null);
  };
  
  const saveTransaction = (updatedTransaction) => {
    setTransaction(transactions.map(transaction => transaction.id === updatedTransaction.id ? updatedTransaction : transaction));
    setEditingTransaction(null);
  };
  
  const handleEditReport = (report) => {
    setEditingReport(report);
    setResponse(report.response || '');
  };
  
  const saveReportResponse = () => {
    setReports(reports.map(report => 
      report.id === editingReport.id ? { ...report, response } : report
    ));
    setEditingReport(null);
    setResponse('');
  };

  const NotificationSettings = ({ notificationsEnabled, setNotificationsEnabled }) => {
    return (
      <div className="config-detail">
        <label className="switch">
          <span>Activar notificaciones</span>
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={() => setNotificationsEnabled(!notificationsEnabled)}
          />
          <span className="slider"></span>
        </label>
      </div>
    );
  };
  
  const SecuritySettings = ({ twoFactorAuth, setTwoFactorAuth }) => {
    return (
      <div className="config-detail">
        <label className="switch">
          <span>Autenticación de dos factores</span>
          <input
            type="checkbox"
            checked={twoFactorAuth}
            onChange={() => setTwoFactorAuth(!twoFactorAuth)}
          />
          <span className="slider"></span>
        </label>
      </div>
    );
  };
  
  const AppearanceSettings = ({ darkMode, setDarkMode }) => {
    return (
      <div className="config-detail">
        <label className="switch">
          <span>Modo oscuro</span>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <span className="slider"></span>
        </label>
      </div>
    );
  };
  

  const renderSection = () => {
    switch (activeSection) {
      case 'usuarios':
  return (
    <div className="section">
      <h2 className="section-title">Usuarios</h2>
      <div className="underline"></div>
      <div className="content-box">
        <div className="section">
          {showUsers && (
            <>
              <div className="user-list-header">
                <span>ID</span>
                <span>Nombre</span>
                <span>Tipo</span>
                <span>Fecha</span>
                <span>Balance</span>
              </div>
              <ul className="user-list">
                {users.map((user) => (
                  <li key={user.id} className="user-item">
                    <div className="user-profile">  
                      <div className="circle"></div>
                      <span>{user.id}</span>
                      <span>{user.name}</span>
                      <span>{user.type}</span>
                      <span>{user.date}</span>
                      <span>{user.balance}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
      <div className="action-button">
        <button onClick={fetchUsers}>
          <IoPeople /> Ver Usuarios
        </button>
      </div>
    </div>
  );

  case 'transacciones':
  return (
    <div className="section">
      <h2 className="section-title">Transacciones</h2>
      <div className="underline"></div>
      <div className="content-box">
        <div className="section">
          {!editingTransaction && showTransactions && (
            <>
              <div className="list-header">
                <span>ID</span>
                <span>Tipo</span>
                <span>Monto</span>
                <span>Fecha</span>
                <span>Editar</span>
              </div>
              <ul className="user-list">
                {transactions.map((transaction) => (
                  <li key={transaction.id} className="user-item">
                    <div className="user-profile">
                      <span>{transaction.id}</span>
                      <span>{transaction.type}</span>
                      <span>{transaction.amount}</span>
                      <span>{transaction.date}</span>
                      <button onClick={() => handleEditTransaction(transaction)}>Editar Transacción</button>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}

          {editingTransaction && (
            <div className="edit-form">
              <h3>Editar Transacción</h3>
              <input 
                type="text" 
                value={editingTransaction.amount} 
                onChange={(e) => setEditingTransaction({ ...editingTransaction, amount: e.target.value })} 
              />
              <input 
                type="date" 
                value={editingTransaction.date} 
                onChange={(e) => setEditingTransaction({ ...editingTransaction, date: e.target.value })} 
              />
              <button onClick={() => saveTransaction(editingTransaction)}>Guardar Cambios</button>
              <button onClick={() => setEditingTransaction(null)}>Cancelar</button>
            </div>
          )}
        </div>
        <div className="action-button">
          {!editingTransaction && (
            <button onClick={fetchTransactions}>
              <IoEye /> Ver Transacciones
            </button>
          )}
        </div>
      </div>
    </div>
  );

  case 'reportes':
  return (
    <div className="section">
      <h2 className="section-title">Reportes</h2>
      <div className="underline"></div>
      <div className="content-box"> 
        <div className="section">
          {!editingReport && showReports && (
            <>
              <div className="list-header">
                <span>ID</span>
                <span>Tipo</span>
                <span>Fecha</span>
                <span>Respuesta</span>
                <span>Responder</span>
              </div>
              <ul className="user-list">
                {reports.map((report) => (
                  <li key={report.id} className="user-item">
                    <div className="user-profile">
                      <span>{report.id}</span>
                      <span>{report.type}</span>
                      <span>{report.date}</span>
                      <span>{report.response || "Sin respuesta"}</span>
                      <button onClick={() => handleEditReport(report)}>Responder</button>
                    </div>
                  </li>
                ))}      
              </ul>
            </>
          )}
          
          {editingReport && (
            <div className="edit-form">
              <h3>Responder al Reporte</h3>
              <textarea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder="Escribe tu respuesta aquí..."
              />
              <button onClick={saveReportResponse}>Guardar Respuesta</button>
              <button onClick={() => setEditingReport(null)}>Cancelar</button>
            </div>
          )}
        </div>
      </div>
      <div className="action-button">
        <button onClick={fetchReports}>
          <IoFileTrayFullSharp /> Generar Reporte
        </button>
      </div>
    </div>
  );

  case 'gestionarCuentas':
    return (
      <div className="section">
        <h2 className="section-title">Gestion de Cuentas</h2>
        <div className="underline"></div>
        <div className="content-box">
        <div className="section">
        {!editingUser && showUsers && (
          <>
            <div className="user-list-header">
              <span>ID</span>
              <span>Nombre</span>
              <span>Tipo</span>
              <span>Fecha</span>
              <span>Editar</span>
            </div>
            <ul className="user-list">
              {users.map((user) => (
                <li key={user.id} className="user-item">
                  <div className="user-profile">  
                  <div className="circle"></div>
                    <span>{user.id}</span>
                    <span>{user.name}</span>
                    <span>{user.type}</span>
                    <span>{user.date}</span>
                    <button onClick={() => handleEditUser(user)}>Editar Usuario</button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
        
        {editingUser && (
          <div className="edit-form">
            <h3>Editar Usuario</h3>
            <input
              type="number"
              value={editingUser.id}
              onChange={(e) => setEditingUser({ ...editingUser, id: e.target.value})}
            />
            <input 
              type="text" 
              value={editingUser.name} 
              onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })} 
            />
            <input 
              type="text"
              value={editingUser.type}
              onChange={(e) => setEditingUser({ ...editingUser, type: e.target.value})}
            />
            <input 
              type="date" 
              value={editingUser.date} 
              onChange={(e) => setEditingUser({ ...editingUser, date: e.target.value })} 
            />
            <button onClick={() => saveUser(editingUser)}>Guardar Cambios</button>
            <button onClick={() => setEditingUser(null)}>Cancelar</button>
          </div>
        )}
        </div>
        <button onClick={() => setActiveSection('inicio')}>Volver a Inicio</button>
      </div>
    </div>
    );
  
  case 'estadisticaGeneral':
      const userChartData = {
        labels: sampleUsers.map(user => user.name),
        datasets: [
          {
            label: 'Usuarios',
            data: users.map(user => user.id),
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      };
  
      const transactionChartData = {
        labels: sampleTransactions.map(trans => trans.date),
        datasets: [
          {
            label: 'Transacciones',
            data: sampleTransactions.map(trans => parseFloat(trans.amount.replace(/\$|,/g, ''))),
            backgroundColor: 'rgba(153, 102, 255, 0.5)',
            borderColor: 'rgba(153, 102, 255, 1)',
            fill: false,
          },
        ],
      };
    
      return (
        <div className="section">
          <h2 className="section-title">Estadistica General</h2>
          <div className="underline"></div>
          <div className="content-box">
            <div className="chart-container">
              <div className="chart-item">
                <h3>Total Usuarios</h3>
                <Bar data={userChartData} options={{ responsive: true }} />
            </div>
            <div className="chart-item">
              <h3>Total Transacciones</h3>
              <Line data={transactionChartData} options={{ responsive: true }} />
            </div>
          </div>
        </div>

            <button onClick={() => setActiveSection('inicio')}>Volver a Inicio</button>
        </div>
      );
      
      case 'Configuraciones': {
        return (
          <div className="section">
            <h2 className="section-title">Configuraciones</h2>
            <div className="underline"></div>
            <div className="config-options">
              <div className="config-button">
                <button onClick={() => setShowNotifications(!showNotifications)}>
                  Notificaciones
                </button>
                {showNotifications && (
                  <NotificationSettings
                    notificationsEnabled={notificationsEnabled}
                    setNotificationsEnabled={setNotificationsEnabled}
                  />
                )}
              </div>
              
              <div className="config-button">
                <button onClick={() => setShowSecurity(!showSecurity)}>
                  Seguridad
                </button>
                {showSecurity && (
                  <SecuritySettings
                    twoFactorAuth={twoFactorAuth}
                    setTwoFactorAuth={setTwoFactorAuth}
                  />
                )}
              </div>
      
              <div className="config-button">
                <button onClick={() => setShowAppearance(!showAppearance)}>
                  Apariencia
                </button>
                {showAppearance && (
                  <AppearanceSettings
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                  />
                )}
              </div>
            </div>
            <button onClick={() => setActiveSection('inicio')}>Volver a Inicio</button>
          </div>
        );
      }
    
      default:
    return null;
  }
};

  return (
    <div className="admin-container">
      <Navbar setActiveSection={setActiveSection} />
      <div className="panel-control">
        <div className="section panel-header">
        <h1 className="admin-title">Panel de</h1>
        <h1 className="admin-subtitle">Administrador</h1>
        <div className="underline"></div>
          <div className="user-circle">
            <div className="circle"></div>
            <p>Nombre Usuario</p>
            <button onClick={() => setActiveSection('gestionarCuentas')}><IoAccessibility/> Gestion de Cuentas</button>
            <button onClick={() => setActiveSection('estadisticaGeneral')}><IoPodium/> Estadistica General</button>          
            <button onClick={() => setActiveSection('Configuraciones')}><IoSettings/> Configuraciones</button>
          </div>
        </div>
        <div className="sections">
          {renderSection()}
        </div>
      </div>
    </div>
  );
}