const { Operation, User, Category } = require("../db.js");
const { Sequelize } = require('sequelize');


const getOperations = async (req, res) => {
    try {        
        const operations = await Operation.findAll({
            where: { userId: req.user },
            include: [
                {
                    model: Category,
                    attributes: ["id", "name"]
                },
                {
                    model: User,
                    attributes: ["id", "username"]
                }
            ]
        })
        if (operations) return res.status(200).json(operations);
        else return res.status(204).json('No operations');        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const createOperation = async (req, res) => {
    const { concept, amount, type, category } = req.body;

    try {
        const categoryFound = await Category.findOne({
            where: {
                name: category
            }
        });
        if (!categoryFound) {
            const newCategory = await Category.create({
                name: category,

            })            
            
            const newOperation = await Operation.create({
                concept,
                amount: Number(amount),
                type,
                categoryId: newCategory.id,
                userId: req.user
            })            
        } else {
            const newOperation = await Operation.create({
                concept,
                amount: Number(amount),
                type,
                categoryId: categoryFound.id,
                userId: req.user
            })                        
        }
        return res.status(201).send('Operation created');
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const updateOperation = async (req, res) => {
    const { id } = req.params;
    const { concept, amount, category } = req.body;

    try {
        const operation = await Operation.findByPk(id);

        if (operation.userId === req.user) {
            const categoryFound = await Category.findOne({
                where: { name: category }
            });
    
            if (!categoryFound) {
                const newCategory = await Category.create({
                    name: category
                })
                operation.concept = concept;
                operation.amount = amount;
                operation.categoryId = newCategory.id;
                await operation.save();
            } else {            
                operation.concept = concept;
                operation.amount = amount;
                operation.categoryId = categoryFound.id;
                await operation.save();
            }
            return res.status(201).send('Operation updated');
        } else {
            return res.status(200).send("You don't have access to update this operation");
        }

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


module.exports = {
    getOperations,
    createOperation,
    updateOperation
}