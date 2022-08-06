import React, { useState, useEffect } from 'react';
import './Register.scss';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../../redux/actions';


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
      errors.password = 'You must repeat the password.';
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

  useEffect(() => {
    if (Object.keys(inputErrors).length === 0 && isSubmit) {
      dispatch(register(inputValues));
      navigate('/');
    }
    setIsSubmit(false);
  }, [inputErrors, isSubmit]);

  const token = window.localStorage.getItem('token');

  return (
    <div className='registerContainer'>
      <div className='register'>

        <div className='signUp'>
          <h2>Sign up...</h2>
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
                  <input className='signUpButton' type='submit' value='Sign up' />
                </div>
              </form>
          }

        </div>

      </div>
    </div>
  )
}


export default Register;