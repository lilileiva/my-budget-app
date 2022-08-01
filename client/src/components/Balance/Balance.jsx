import React from 'react';
import './Balance.scss';
import { useNavigate } from 'react-router-dom';


function Balance() {

  const navigate = useNavigate();

  return (
    <div className='balanceContainer'>
      <div className='balance'>
        <p>Balance total</p>
        <h2>$ 0</h2>
      </div>

      <div className='operations'>
        <h2>Últimas operaciones</h2>
        <p>No hay operaciones registradas</p>

        <div className='buttonContainer'>
          <button onClick={() => navigate('/createoperation')}>
            Crear nueva operación
          </button>
        </div>
      </div>
    </div>
  )
}

export default Balance;