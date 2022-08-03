const { Operation, User, Category } = require("../db.js");
const { Sequelize } = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            return res.status(422).json('Username and password are both required');
        }

        const user = await User.findOne({
            where: { username: username }
        })

        if (user) {
            const correctPassword = await bcrypt.compare(password, user.password);

            if (correctPassword) {
                const userToken = {
                    id: user.id,
                }
                const token = jwt.sign(userToken, process.env.SECRETWORD, {
                    expiresIn: 60 * 60 * 24 * 7,
                })
                return res.status(200).send({
                    username,
                    token
                });
            }
        } else {
            return res.status(200).send('User or password is invalid');
        }
    } catch (error) {
        console.log(error)
        return res.status(404).json({ error: 'There was an error...' });
    }
}

const register = async (req, res) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            return res.status(422).json('Username and password are both required');
        }

        const userFound = await User.findOne({
            where: { username: username }
        })

        if (userFound) {
            return res.status(200).send('User already exists');
        } else {
            const saltRounds = 10;
            const hash = bcrypt.hashSync(password, saltRounds)
            await User.create({
                username,
                password: hash
            })
            return res.status(201).send('User created');
        }
    } catch (error) {
        return res.status(404).json({ error: 'There was an error...' });
    }
}


module.exports = {
    login,
    register
}