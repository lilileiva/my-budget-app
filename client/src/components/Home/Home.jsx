import React from 'react';
import './Home.scss';
import { useNavigate } from 'react-router-dom';
import Balance from '../Balance/Balance';
import { motion } from "framer-motion";
import Coin from '../../img/coin.png';


function Home() {

  const navigate = useNavigate();

  const token = window.localStorage.getItem('token');

  return (
    <div className='home'>
      {
        token
          ? <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}>
            <Balance />
          </motion.div>
          : (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className='landing-page'>
              <div className='left'>
                <h1>Your personal budget is here</h1>
                <a className='registerButton' onClick={() => navigate('/register')}>
                  Sign Up
                </a>
              </div>
              <img className='coin' src={Coin} alt='coin image' />
            </motion.div>
          )
      }
    </div>
  )
}

export default Home;