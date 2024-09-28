import React from 'react';
import './App.css';
import LoginForm from './components/Sign';
import RegisterForm from './components/Signup';

function App() {
    const [isActive, setIsActive] = useState(false);

  const toggleActiveClass = () => {
    setIsActive(!isActive);
    };
  return (
    <div className={`container ${isActive ? 'active' : ''}`} id="container">
    <RegisterForm />
    <LoginForm />


      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all of site features</p>
            <button className="hidden" id="login">Sign In</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p>Register with your personal details to use all of site features</p>
            <button className="hidden" id="register">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
