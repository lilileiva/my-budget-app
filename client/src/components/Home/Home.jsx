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

  return (
    <div className='home'>
      <Balance />
    </div>
  )
}

export default Home;