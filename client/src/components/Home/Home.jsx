import React, { useEffect } from 'react';
import './Home.scss';
import Balance from '../Balance/Balance';
import { useDispatch, useSelector } from 'react-redux';
import { getOperations } from '../../redux/actions';


function Home() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOperations());
  }, [dispatch])

  const operations = useSelector((state) => state.operations);

  console.log('operations', operations)

  return (
    <div className='home'>
      <Balance />
    </div>
  )
}

export default Home;