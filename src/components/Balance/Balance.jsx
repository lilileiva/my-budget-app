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

  let transactions = useSelector((state) => state.transactions);
  transactions = transactions.slice(0, 10);

/*----------------CALCALCULATING TOTAL BALANCE-----------*/
  let totalBalance = 0;

  transactions.length !== 0 && transactions.map((transaction) => (
    (transaction.type === 'income') ? totalBalance += transaction.amount : totalBalance -= transaction.amount
  ))
  /*----------------END CALCALCULATING TOTAL BALANCE-----------*/

  return (
    <div className='balanceContainer'>
      <div className='balance'>
        <p>My balance</p>
        <h2>$ {totalBalance}</h2>
      </div>

      <div className='transactions'>
        <h2>Last transactions</h2>
        <ul>
          <li>
            <b>Concept</b>
            <b>Amount</b>
            <b>Type</b>
            <b>Category</b>
          </li>
          {
            transactions.length !== 0
              ? transactions.map((transaction) => (
                <li onClick={() => navigate(`/transaction/edit/${transaction.id}`)}>
                  <p>{transaction.concept}</p>
                  <p>${transaction.amount}</p>
                  <p>{transaction.type}</p>
                  <p>{transaction.Category.name}</p>
                </li>
              ))
              : <p>No transactions are registered</p>
          }
        </ul>
        <div className='buttonContainer'>
          <button onClick={() => navigate('/transaction/create')}>
            Create new transaction
          </button>
        </div>
      </div>
    </div>
  )
}

export default Balance;