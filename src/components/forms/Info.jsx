import "./info.css";

const Info = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <h1>Transforma Tu Futuro Financiero Desde Casa</h1>
        <p>
          ¡Bienvenido , Accede a tus cuentas, realiza transacciones y gestiona
          tus finanzas de manera rápida, segura y sin complicaciones. Estamos
          aquí para hacerte la vida más fácil, desde donde estés.
        </p>
      </section>

      <section className="features">
        <div className="feature-card">
          <h2>Confianza y Seguridad</h2>
          <p>
            Transacciones seguras, rápidas y confiables. Tu dinero siempre
            protegido con sistemas de seguridad de clase mundial.
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
          <h2>Innovación y Tecnología</h2>
          <p>
            Con la tecnología más avanzada, simplificamos tu vida financiera.
            Banca inteligente para un mundo digital.
          </p>
        </div>
        <div className="feature-card">
          <h2>Atención al Cliente 24/7</h2>
          <p>
            ¿Necesitas ayuda? Estamos aquí para ti 24/7 con atención
            personalizada en todo momento.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Info;
