import React from 'react';
import './Navbar.scss';
import { useNavigate } from 'react-router-dom';


function Navbar() {

  const navigate = useNavigate();

  return (
    <div className='navbar'>
      <a onClick={() => navigate('/')}>
        <h1>Presupuesto Personal</h1>
      </a>
      <div className='buttons'>
        <a  className='loginButton' onClick={() => navigate('/login')}>Iniciar sesión</a>
        <a className='registerButton' onClick={() => navigate('/register')}>Registrarse</a>
      </div>
    </div>
  )
}


export default Navbar;