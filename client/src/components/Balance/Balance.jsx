import React, { useEffect } from 'react';
import './Balance.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactions } from '../../redux/actions';


function Balance() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch])

  const transactions = useSelector((state) => state.transactions);

  console.log('transactions', transactions)

  return (
    <div className='balanceContainer'>
      <div className='balance'>
        <p>My balance</p>
        <h2>$ 0</h2>
      </div>

      <div className='transactions'>
        <h2>Last transactions</h2>
        {
          transactions
          ? transactions.map((transaction) => (
            <div>
              <p>{transaction.type}</p>
              <p>{transaction.concept}</p>
              <p>{transaction.amount}</p>
              <p>{transaction.category}</p>
            </div>
          ))
          : <p>No transactions are registered</p>
        }        
        <div className='buttonContainer'>
          <button onClick={() => navigate('/transaction/create')}>
            Crete new transaction
          </button>
        </div>
      </div>
    </div>
  )
}

export default Balance;