import React from 'react';
import './Login.scss';


function Login() {
  return (
    <div className='login'>
        <p>Inicia sesión...</p>
        <form>
            <input type='text' placeholder='Username...' />            
            <input type='text' placeholder='Password...' />                        
            <input type='submit' value='Ingresar' />           
        </form>
    </div>
  )
}


export default Login;