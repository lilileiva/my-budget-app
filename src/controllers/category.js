const { Category } = require("../db.js");
const { Sequelize } = require('sequelize');


const getCategories = async (req, res) => {
    try {        
        const categories = await Category.findAll()
        if (categories) return res.status(200).json(categories);
        else return res.status(204).json('There are not categories');        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getCategories,
}