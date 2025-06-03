import { useEffect, useRef, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaWindows } from "react-icons/fa";
import { FaChrome } from "react-icons/fa";
import { FaLinux } from "react-icons/fa";
import { BsAndroid2 } from "react-icons/bs";
import { FaApple } from "react-icons/fa";
import "./editoptions.css";
import useUser from "../../hooks/useUser";

const getBrowser = (userAgent) => {
  if (userAgent.includes("Chrome")) {
    return <FaChrome size={20} />;
  }
  if (userAgent.includes("Firefox")) {
    return <FaChrome size={20} />;
  }
  <FaWindows size={20} />;
  return <>Unknow</>;
};
const getDevice = (userAgent) => {
  if (userAgent.includes("Windows")) {
    return <FaWindows size={20} />;
  }
  if (userAgent.includes("Linux")) {
    return <FaLinux size={20} />;
  }
  if (userAgent.includes("Apple")) {
    return <FaApple size={20} />;
  }
  if (userAgent.includes("Android")) {
    return <BsAndroid2 size={20} />;
  }
  return <>Unknow</>;
};

export default function EditOptions() {
  const [sessions, setSessions] = useState([]);
  const [fullName, setFullName] = useState("");
  const { logout } = useUser();
  const userId = useRef(null);

  const handlerLogout = () => {
    logout((data, err) => {
      if (err) {
        return alert(
          "Hubo un error al tratar de cerrar sesion, Intentalo de nuevo."
        );
      }
      window.localStorage.clear();
      navigate("/");
    }, userId.current);
  };

  useEffect(() => {
    const userLocalInfo = window.localStorage.getItem("userInfo");
    const session = window.localStorage.getItem("session");
    if (!userLocalInfo || !session) {
      return navigate("/");
    }
    const userInfo = JSON.parse(userLocalInfo);
    const sessionData = JSON.parse(session);
    userId.current = sessionData.userId;
    const fullName =
      userInfo.user.data.firstName + " " + userInfo.user.data.lastName;
    setFullName(fullName);
    setSessions(userInfo.user.sessions.reverse());
  }, []);

  const navigate = useNavigate();
  return (
    <div className="container-options-edit">
      <IoArrowBack
        className="back-icon"
        onClick={() => navigate("/lobby")}
        size={30}
      />
      <div className="container-options">
        <h1>Ajustes</h1>
        <div className="container-history-session">
          <div>
            <p>
              <b>{fullName}</b>
            </p>
            <p>historial de sesiones:</p>
          </div>
          <div className="container-sessions">
            {sessions.map((s, i) => {
              return (
                <div key={i} className="card-session">
                  <p>
                    <b>ip: </b>
                    {s.ip}
                  </p>
                  <p>
                    <b>fecha: </b>
                    {new Date(s.createdAt).toLocaleDateString()}
                  </p>
                  <p>
                    <b>hora: </b>
                    {new Date(s.createdAt).toLocaleTimeString()}
                  </p>
                  <p>
                    <b>navegador:</b> {getBrowser(s.userAgent)}
                  </p>
                  <p>
                    <b>dispositivo:</b> {getDevice(s.userAgent)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="container-cards-options">
          <div className="card-option" onClick={() => navigate("user")}>
            usuario
          </div>
          <div className="card-option" onClick={() => navigate("security")}>
            Seguridad
          </div>
          <div className="card-option" onClick={() => navigate("blocks")}>
            Bloqueos
          </div>
        </div>
        <div className="submit" onClick={() => handlerLogout()}>
          Cerrar sesion
        </div>
      </div>
    </div>
  );
}
