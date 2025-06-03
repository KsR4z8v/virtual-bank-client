import {
  IoPodium,
  IoSettings,
  IoHome,
  IoSync,
  IoWarning,
  IoPower,
  IoPeople,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function Navbar({ setActiveSection }) {
  const navigate = useNavigate();
  return (
    <nav className="navbar2">
      <h2>AppBank</h2>
      <ul>
        <li>
          <button onClick={() => navigate("users")}>
            <IoPeople /> Usuarios
          </button>
        </li>
        <li>
          <button onClick={() => navigate("transactions")}>
            <IoSync /> Transacciones
          </button>
        </li>
        <li>
          <button onClick={() => navigate("users")}>
            <IoWarning /> Reportes
          </button>
        </li>
        <li>
          <button onClick={() => navigate("users")}>
            <IoSettings /> Configuraciones
          </button>
        </li>
        <li>
          <button onClick={() => navigate("users")}>
            <IoPodium /> Estadísticas
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              localStorage.removeItem("session");
              localStorage.removeItem("userInfo");
              navigate("/");
            }}
          >
            <IoPower /> Salir
          </button>
        </li>
      </ul>
    </nav>
  );
}
