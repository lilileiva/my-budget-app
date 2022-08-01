const { Operation, User, Category } = require("../db.js");
const { Sequelize } = require('sequelize');


const prueba = async (req, res) => {
    try {
        return res.status(200).json('prueba');
    } catch (error) {
        return res.status(404).json({ error: 'There was an error...' });
    }
}

const getOperations = async (req, res) => {
    try {        
        const operations = await Operation.findAll()
        // const operations = await Operation.findAll({
        //     include: [
        //         {
        //             model: Category,
        //             attributes: ["id", "name"]
        //         },
        //         {
        //             model: User,
        //             attributes: ["id", "username"]
        //         }
        //     ]
        // })
        if (operations) return res.status(200).json(operations);        
        else return res.status(204).json('No operations');
    } catch (error) {
        console.log(error)       
        return res.status(404).json({ error: 'There was an error...' });
    }
}

const createOperation = async (req, res) => {
    const { concept, amount, type, category } = req.body;
    amount = Number(amount);

    try {
        const newOperation = await Operation.create({
            concept,
            amount,
            type
        })
        const newCategory = await Genre.findOrCreate({
            name: category
        })
        await newOperation.setCategory(newCategory);

        return res.status(200).send('Operation created');
    } catch (error) {
        return res.status(404).json({ error: 'There was an error...' });
    }
}


module.exports = {
    prueba,
    getOperations,
    createOperation
}