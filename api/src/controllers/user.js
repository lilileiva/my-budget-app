const { Operation, User, Category } = require("../db.js");
const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');


const login = async (req, res) => {
    const { username, password } = req.body;

    try {


        return res.status(200).json(operations);
    } catch (error) {
        console.log(error)
        return res.status(404).json({ error: 'There was an error...' });
    }
}

const register = async (req, res) => {
    const { username, password } = req.body;

    try {
        const userFound = await User.findOne({    
            where: { username: username}
        })

        if (userFound) {
            return res.status(201).send('User already exists');
        } else {
            const saltRounds = 10;
            const hash = bcrypt.hashSync(password, saltRounds)
            const newUser = await User.create({
                username,
                password: hash
            })
                
            return res.status(201).send('User created');
        }
    } catch (error) {
        console.log(error)
        // return res.status(404).json({ error: 'There was an error...' });
    }
}


module.exports = {
    login,
    register
}