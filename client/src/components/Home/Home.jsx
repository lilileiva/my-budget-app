import React from 'react';
import './Home.scss';
import { useNavigate } from 'react-router-dom';
import Balance from '../Balance/Balance';



function Home() {

  const navigate = useNavigate();

  const token = window.localStorage.getItem('token');

  return (
    <div className='home'>
      {
        token
          ? <Balance />
          : (
            <div className='landing-page'>
              <h1>Your personal budget is here</h1>
              <a className='registerButton' onClick={() => navigate('/register')}>
                Sing Up
              </a>
            </div>
          )
      }
    </div>
  )
}

export default Home;