import React from 'react';
import './Home.scss';
import Balance from '../Balance/Balance';



function Home() {

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