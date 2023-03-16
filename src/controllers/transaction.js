const { Transaction, User, Category } = require("../db.js");
const { Sequelize } = require('sequelize');


const getTransactions = async (req, res) => {
    try {        
        const transactions = await Transaction.findAll({
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
        if (transactions) return res.status(200).json(transactions);
        else return res.status(204).json('No transactions');        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const createTransaction = async (req, res) => {
    const { concept, amount, type, category } = req.body;
    try {
        const categoryFound = await Category.findOne({
            where: {
                name: category,
                userId: req.user
            }
        });
        if (!categoryFound) {
            const newCategory = await Category.create({
                name: category,
                userId: req.user
            })            
            const newTransaction = await Transaction.create({
                concept,
                amount: Number(amount),
                type,
                categoryId: newCategory.id,
                userId: req.user
            })            
        } else {
            const newTransaction = await Transaction.create({
                concept,
                amount: Number(amount),
                type,
                categoryId: categoryFound.id,
                userId: req.user
            })                        
        }
        return res.status(201).json('Transaction created');
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const updateTransaction = async (req, res) => {
    const { id } = req.params;
    const { concept, amount, category, type } = req.body;
    try {
        const transaction = await Transaction.findByPk(id);
        if (transaction.userId === req.user) {
            const categoryFound = await Category.findOne({
                where: {
                    id: req.user,
                    name: category
                }
            });
            if (!categoryFound) {
                const newCategory = await Category.create({
                    name: category
                })
                transaction.concept = concept;
                transaction.amount = amount;
                transaction.categoryId = newCategory.id;
                transaction.type = type;
                await transaction.save();
            } else {            
                transaction.concept = concept;
                transaction.amount = amount;
                transaction.categoryId = categoryFound.id;
                await transaction.save();
            }
            return res.status(201).json('Transaction updated');
        } else {
            return res.status(200).json("You don't have permission to update this transaction");
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const deleteTransaction = async (req, res) => {
    const { id } = req.params;
    try {
        const transaction = await Transaction.findByPk(id);
        if (transaction.userId == req.user) {
            await transaction.destroy()
            return res.status(200).json("Transaction successful deleted");
        } else {
            return res.status(200).json("You don't have permission to delete this transaction");
        }        
    } catch (error) {
        return res.status(json).json({ error: error.message })
    }
}


module.exports = {
    getTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction
}