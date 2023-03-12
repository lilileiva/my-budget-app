import React, { useState, useEffect } from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../redux/actions/types';
import axios from 'axios';
import { motion } from "framer-motion";
import Alert from '../Alert/Alert';
import Loader from '../Loader/Loader';


function Login() {

  const navigate = useNavigate();

  const [inputValues, setInputValues] = useState({
    username: "",
    password: ""
  })

  const [inputErrors, setInputErrors] = useState({})
  const validate = (inputValues) => {
    let errors = {}

    if (!inputValues.username) {
      errors.username = 'You must insert an username.';
    }
    if (!inputValues.password) {
      errors.password = 'You must insert a password.';
    }

    return errors;
  }

  const handleInputChange = (e) => {
    e.preventDefault();
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value
    })
  }

  const [isSubmit, setIsSubmit] = useState(false);
  const handleInputSubmit = (e) => {
    e.preventDefault();
    setInputErrors(validate(inputValues));
    setIsSubmit(true);
  }

  const [isOpen, setIsOpen] = useState(false);

  const loginRequest = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/users/login`, inputValues);
      const token = response.data.token;

      if (response.status === 200 && token) {
        window.localStorage.setItem('token', token);
        navigate('/');
      } else {
        if (!isOpen) setIsOpen(true);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (Object.keys(inputErrors).length === 0 && isSubmit) {
      setIsLoading(true);
      loginRequest()
    }
    setIsSubmit(false);
  }, [inputErrors, isSubmit]);

  const token = window.localStorage.getItem('token');

  return (
    <div
      className='loginContainer'>
      <motion.div
        initial={{ y: 1000 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.1 }}
        className='login'>

        <div className='signIn'>
          <h2>Sign in</h2>
        </div>

        <div className='loginForm'>
          {
            token
              ? <p>You already signed in</p>
              : <form onSubmit={(e) => handleInputSubmit(e)}>
                <div>
                  <input type='text' name='username' value={inputValues.username} placeholder='Username...' onChange={(e) => handleInputChange(e)} />
                  {inputErrors.username && <p className='error'>{inputErrors.username}</p>}
                </div>
                <div>
                  <input type='password' name='password' value={inputValues.password} placeholder='Password...' onChange={(e) => handleInputChange(e)} />
                  {inputErrors.password && <p className='error'>{inputErrors.password}</p>}
                </div>
                <div className='buttonContainer'>
                  {
                    isLoading
                      ? <div className='loaderContainer'>
                        <Loader />
                      </div>
                      : <input className='loginButton' type='submit' value='Log in' />
                  }
                </div>
              </form>
          }
        </div>

      </motion.div>
      {
        isOpen && <Alert text='Incorrect username or password' setIsOpen={setIsOpen} />
      }
    </div>
  )
}


export default Login;