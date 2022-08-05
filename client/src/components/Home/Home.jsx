import React, { useEffect } from 'react';
import './Home.scss';
import Balance from '../Balance/Balance';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactions } from '../../redux/actions';


function Home() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch])

  const transactions = useSelector((state) => state.transactions);

  console.log('transactions', transactions)

  const token = window.localStorage.getItem('token');

  return (
    <div className='home'>

      {
        token
          ? <Balance />
          : (
            null
          )
      }

    </div>
  )
}

export default Home;