const { Operation, User, Category } = require("../db.js");
const { Sequelize } = require('sequelize');


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

const createOperation = async(req, res) => {    
    const { concept, amount, type, category } = req.body;
    
    try {                
        const newOperation = await Operation.create({
            concept,
            amount: Number(amount),
            type
        })

        const categoryFound = await Category.findAll({
            where: {
                name: category
            }
        });
        if (!categoryFound) {
            await newOperation.setCategory(categoryFound);
            await newOperation.setUser(req.user);
        } else {
            const newCategory = await Category.create({
                name: category
            })
            await newOperation.setCategory(newCategory);
        }

        return res.status(201).send('Operation created');
    } catch (error) {
        console.log(error)
        // return res.status(404).json({ error: 'There was an error...' });        
    }
}


module.exports = {    
    getOperations,
    createOperation
}