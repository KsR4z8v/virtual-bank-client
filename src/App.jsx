import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import RecuperarContrasena from './RecuperarContrasena.jsx';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/recuperar">Recuperar Contraseña</Link>
            </li>
          </ul>
        </nav>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
                <img src={viteLogo} className="logo" alt="Vite logo" />
              </a>
              <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
                <img src={reactLogo} className="logo react" alt="React logo" />
              </a>
              <h1>Vite + React</h1>
              <div className="card">
                <button onClick={() => setCount(count + 1)}>
                  count is {count}
                </button>
                <p>
                  Edit <code>src/App.jsx</code> and save to test HMR
                </p>
              </div>
              <p className="read-the-docs">
                Click on the Vite and React logos to learn more
              </p>
            </div>
          }
        />
        <Route path="/recuperar" element={<RecuperarContrasena />} />
      </Routes>
    </Router>
  );
}

export default App;
