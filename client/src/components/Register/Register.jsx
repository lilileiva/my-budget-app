import React, { useState, useEffect } from 'react';
import './Register.scss';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../../redux/actions';
import { motion } from "framer-motion";
import Alert from '../Alert/Alert';
import axios from 'axios';
import { BASE_URL } from '../../redux/actions/types';
import Loader from '../Loader/Loader';


function Register() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputValues, setInputValues] = useState({
    username: "",
    password: "",
    repeatpassword: ""
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
    if (!inputValues.repeatpassword) {
      errors.repeatpassword = 'You must repeat the password.';
    }
    if (inputValues.password && inputValues.repeatpassword && inputValues.password !== inputValues.repeatpassword) {
      errors.repeatpassword = 'Passwords are different';
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

  const [text, setText] = useState("")
  const [isOpen, setIsOpen] = useState(false);

  const registerRequest = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/users/register`, inputValues);

      if (response.status === 201) {
        setText('User created succesfully!');
        setIsOpen(true);
        setInputValues({
          ...inputValues,
          username: "",
          password: "",
          repeatpassword: ""
        })
      } else {
        setText('Username is not available');
        setIsOpen(true);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (Object.keys(inputErrors).length === 0 && isSubmit) {
      setIsLoading(true);
      registerRequest()
    }
    setIsSubmit(false);
  }, [inputErrors, isSubmit]);

  const token = window.localStorage.getItem('token');

  return (
    <div className='registerContainer'>
      <motion.div
        initial={{ y: 1000 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
        className='register'>

        <div className='signUp'>
          <h2>Sign up</h2>
        </div>
        <div className='registerForm'>
          {
            token
              ? <p>You can't sign up now because you are already in a session</p>
              : <form onSubmit={(e) => handleInputSubmit(e)}>
                <div>
                  <input type='text' name='username' value={inputValues.username} placeholder='Username...' onChange={(e) => handleInputChange(e)} />
                  {inputErrors.username && <p className='error'>{inputErrors.username}</p>}
                </div>
                <div>
                  <input type='password' name='password' value={inputValues.password} placeholder='Password...' onChange={(e) => handleInputChange(e)} />
                  {inputErrors.password && <p className='error'>{inputErrors.password}</p>}
                </div>
                <div>
                  <input type='password' name='repeatpassword' value={inputValues.repeatpassword} placeholder='Repeat password...' onChange={(e) => handleInputChange(e)} />
                  {inputErrors.repeatpassword && <p className='error'>{inputErrors.repeatpassword}</p>}
                </div>
                <div className='buttonContainer'>
                  {
                    isLoading
                      ? <div className='loaderContainer'>
                        <Loader />
                      </div>
                      : <input className='signUpButton' type='submit' value='Sign up' />
                  }
                </div>
              </form>
          }
        </div>

      </motion.div>
      {
        isOpen && <Alert text={text} setIsOpen={setIsOpen} />
      }
    </div>
  )
}


export default Register;