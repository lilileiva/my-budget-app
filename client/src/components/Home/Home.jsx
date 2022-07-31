import React from 'react';
import './Home.scss';
import { useNavigate } from 'react-router-dom';
import Balance from '../Balance/Balance';


function Home() {

  const navigate = useNavigate();

  return (
    <div className='home'>
      <Balance />
      <button onClick={() => navigate('/createoperation')}>
        Crear nueva operación
      </button>
    </div>
  )
}

export default Home;