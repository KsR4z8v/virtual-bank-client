import React, { useState } from 'react';
import './RecuperarContraseña.css';

const RecuperarContraseña = () => {
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');

  const recuperador = (e) => {
    e.preventDefault(); 
    // To do: lógica para recuperar la contraseña
    setMensaje(`Se envio el enlace para recuperar la contraseña a ${email}`);
  };

  return (
    <div className="RecuperarContraseña">
      <h2>Recuperar Contraseña</h2>
      <form onSubmit={recuperador}>
        <label htmlFor="email">Correo Electrónico</label>
        <input 
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Enviar</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default RecuperarContraseña;
