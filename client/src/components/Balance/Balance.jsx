import React, { useEffect } from 'react';
import './Balance.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactions } from '../../redux/actions';
import { AiOutlinePlus, AiOutlineArrowDown } from 'react-icons/ai';
import { BiStats } from 'react-icons/bi';


function Balance() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch])

  const transactions = useSelector((state) => state.transactions);

  /*----------------CALCALCULATING TOTAL BALANCE-----------*/
  let totalBalance = 0;

  if (transactions.length !== 0 && Object.keys(transactions)[0] !== 'error') {
    transactions.map((transaction) => (
      (transaction.type === 'Income') ? totalBalance += transaction.amount : totalBalance -= transaction.amount
    ))
  }

  /*----------------END CALCALCULATING TOTAL BALANCE-----------*/

  return (
    <div className='balanceContainer'>
      <div className='balance'>
        <p>My balance <BiStats /></p>
        <h2>$ {totalBalance}</h2>
      </div>

      <div className='transactions'>
        <h2>Lastest transactions <AiOutlineArrowDown /></h2>
        <ul>
          <li>
            <b>Concept</b>
            <b>Amount</b>
            <b>Type</b>
            <b>Category</b>
            <b>Date</b>
          </li>
          {
            transactions.length > 0
              ? transactions.slice(0, 10).map((transaction) => (
                <li onClick={() => navigate(`/transaction/edit/${transaction.id}`)}>
                  <p>{transaction.concept}</p>
                  <p>${transaction.amount}</p>
                  <p>{transaction.type}</p>
                  <p>{transaction.Category.name}</p>
                  <p>{transaction.updatedAt.toString().slice(0, 10)}</p>
                </li>
              ))
              : <p>No transactions are registered</p>
          }
        </ul>
        <div className='buttonContainer'>
          <button onClick={() => navigate('/transaction/create')}>
            Create new transaction <AiOutlinePlus />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Balance;