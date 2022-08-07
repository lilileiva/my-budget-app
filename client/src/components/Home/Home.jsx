import React from 'react';
import './Home.scss';
import { useNavigate } from 'react-router-dom';
import Balance from '../Balance/Balance';
import { motion } from "framer-motion";


function Home() {

  const navigate = useNavigate();

  const token = window.localStorage.getItem('token');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className='home'>
      {
        token
          ? <Balance />
          : (
            <div className='landing-page'>
              <h1>Your personal budget is here</h1>
              <a className='registerButton' onClick={() => navigate('/register')}>
                Sign Up
              </a>
            </div>
          )
      }
    </motion.div>
  )
}

export default Home;