const { Category } = require("../db.js");
const { Sequelize } = require('sequelize');


const getCategories = async (req, res) => {
    try {        
        const categories = await Category.findAll({
            where: { userId: req.user }
        })        
        if (categories) return res.status(200).json(categories);
        else return res.status(204).json('There are not categories');        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Category.findByPk(id);
        const categoryName = category.name
        if (category.userId == req.user) {
            await category.destroy()
            return res.status(200).json(`Category "${categoryName}" deleted`);
        } else {
            return res.status(200).json(`You don't have permissions to delete this category`);
        }    
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getCategories,
    deleteCategory
}