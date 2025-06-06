import { useEffect } from "react";
import Header from "../components/forms/Header";
import { useNavigate } from "react-router-dom";
import "./home.css";
function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    const session = window.localStorage.getItem("session");
    if (session) {
      const dataSession = JSON.parse(session);
      if (dataSession.roles.includes(1)) {
        navigate("/admin");
      } else {
        navigate("/lobby");
      }
    }
  }, []);

  return (
    <div className="container-info">
      <div className="section-1">
        <Header />
        <div className="section-1__text">
          <h1>Transforma Tu Futuro Financiero Desde Casa</h1>
          <p>
            ¡Bienvenido , Accede a tus cuentas, realiza transacciones y gestiona
            tus finanzas de manera rápida, segura y sin complicaciones. Estamos
            aquí para hacerte la vida más fácil, desde donde estés.
          </p>
        </div>
        <img
          className="background-image"
          src="../../assets/markus-winkler-ahjzVINkuCs-unsplash.jpg"
          alt=""
        />
      </div>

      <div className="section-2">
        <div className="section-2__text">
          <h1>Lo que te ofrecemos</h1>
          <p>
            Explora las ventajas que AppBank tiene para mejorar tu experiencia
            financiera. Seguridad, comodidad.
          </p>
        </div>
        <div className="feature-card">
          <h2>Confianza y Seguridad</h2>
          <p>
            Transacciones seguras, rápidas y confiables. Tu dinero siempre
            protegido.
          </p>
        </div>
        <div className="feature-card">
          <h2>Facilidad y Comodidad</h2>
          <p>
            Todo lo que necesitas a un clic de distancia. Banca digital fácil y
            rápida desde tu móvil o computadora.
          </p>
        </div>

        <div className="feature-card">
          <h2>Atención al Cliente 24/7</h2>
          <p>
            ¿Necesitas ayuda? Estamos aquí para ti 24/7 con atención
            personalizada en todo momento.
          </p>
        </div>
      </div>
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 Tu Empresa. Todos los derechos reservados.</p>
          <p>
            Contacto: <a href="mailto:info@tuempresa.com">info@tuempresa.com</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
export default Home;
