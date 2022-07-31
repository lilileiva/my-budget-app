const { Operation, User, Category } = require("../db.js");
const { Sequelize } = require('sequelize');


const prueba = async (req, res) => {
    try {
        return res.status(200).json('prueba');
    } catch (error) {
        return res.status(404).json({ error: 'There was an error...' });
    }
}


module.exports = {
    prueba
}