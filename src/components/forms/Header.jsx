import "./header.css";
import { FaUserCircle } from "react-icons/fa";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="logo">
        <FaMoneyCheckAlt size={40} />
        <h1>AppBank</h1>
      </div>

      <nav className="navbar">
        <ul>
          <li>
            <a href="#inicio">Inicio</a>
          </li>

          <li>
            <a href="#soporte">Soporte</a>
          </li>

          <li>
            <a href="#transacciones"onClick={() => navigate('/transfers')}>Transacciones</a>
          </li>

        </ul>
      </nav>

      <div className="header-actions">
        {/* <select className="language-select">
          <option value="es">ES</option>
          <option value="en">EN</option>
        </select> */}
        <button onClick={() => navigate("/forms")} className="cta-button">
          Iniciar{" "}
        </button>
        <button className="cta-button">Nosotros</button>
        <FaUserCircle className="user-icon" size={28} />
      </div>
    </header>
  );
};

export default Header;
