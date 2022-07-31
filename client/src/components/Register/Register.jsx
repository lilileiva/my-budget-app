import React from 'react';
import './Register.scss';


function Register() {
  return (
    <div className='register'>
        <h2>Registro...</h2>
        <form>
            <input type='text' placeholder='Username...' />            
            <input type='text' placeholder='Password...' />            
            <input type='text' placeholder='Repeat password...' /> 
            <input type='submit' value='Registrarse' />           
        </form>
    </div>
  )
}


export default Register;