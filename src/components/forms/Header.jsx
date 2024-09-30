import "./header.css";
import { FaUserCircle } from "react-icons/fa";
import { FaMoneyCheckAlt } from "react-icons/fa";
const Header = () => {
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
            <a href="#productos">Productos</a>
          </li>
          <li>
            <a href="#inversiones">Inversiones</a>
          </li>
          <li>
            <a href="#prestamos">Préstamos</a>
          </li>
          <li>
            <a href="#soporte">Soporte</a>
          </li>
        </ul>
      </nav>

      <div className="header-actions">
        <select className="language-select">
          <option value="es">ES</option>
          <option value="en">EN</option>
        </select>
        <button className="cta-button">Nostros</button>
        <FaUserCircle className="user-icon" size={28} />
      </div>
    </header>
  );
};

export default Header;
