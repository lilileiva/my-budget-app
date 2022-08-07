import React from 'react';
import './Navbar.scss';
import { useNavigate } from 'react-router-dom';


function Navbar() {

  const navigate = useNavigate();

  const signOut = () => {
    window.localStorage.clear();
    navigate('/login');
  }

  const token = window.localStorage.getItem('token');

  return (
    <div className='navbar'>
      <a onClick={() => navigate('/')}>
        <h1>My Budget</h1>
      </a>
      <div className='buttons'>
        {
          token
            ? <a className='loginButton' onClick={() => signOut()}>Sign out</a>
            : <>
              <a className='loginButton' onClick={() => navigate('/login')}>Sign in</a>
              <a className='registerButton' onClick={() => navigate('/register')}>Sign up</a>
            </>
        }
      </div>
    </div>
  )
}


export default Navbar;