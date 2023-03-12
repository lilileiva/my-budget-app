import React, { useState } from 'react';
import './Alert.scss';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { AiOutlineCheck } from 'react-icons/ai';


function Alert({ text, setIsOpen }) {

    const navigate = useNavigate();

    const pathname = window.location.pathname;

    const closeAlert = () => {
        setIsOpen(false);
        pathname === '/register' ? navigate('/login') : navigate('/');        
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.1 }}
            className='alertContainer'>
            <p>{text}</p>
            <button onClick={() => closeAlert()}>
                <AiOutlineCheck />
            </button>
        </motion.div>
    )
}

export default Alert;