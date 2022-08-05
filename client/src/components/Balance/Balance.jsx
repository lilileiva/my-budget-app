import React from 'react';
import './Balance.scss';
import { useNavigate } from 'react-router-dom';


function Balance() {

  const navigate = useNavigate();

  return (
    <div className='balanceContainer'>
      <div className='balance'>
        <p>My balance</p>
        <h2>$ 0</h2>
      </div>

      <div className='transactions'>
        <h2>Last transactions</h2>
        <p>No transactions are registered</p>

        <div className='buttonContainer'>
          <button onClick={() => navigate('/createtransaction')}>
            Crete new transaction
          </button>
        </div>
      </div>
    </div>
  )
}

export default Balance;