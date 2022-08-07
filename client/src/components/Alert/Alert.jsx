import React from 'react';
import './Alert.scss';
import { motion } from "framer-motion";


function Alert({ text, setIsOpen }) {

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.1 }}
            className='alertContainer'>
            <p>{text}</p>
            <button onClick={() => setIsOpen(false)}>
                Ok!
            </button>
        </motion.div>
    )
}

export default Alert;