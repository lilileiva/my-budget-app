const { User } = require("../db.js");
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
            where: { username }
        })
        if (user) {
            const correctPassword = await bcrypt.compare(password, user.password);
            if (correctPassword) {
                const userToken = {
                    id: user.id,
                }
                console.log(process.env.SECRETWORD)
                const token = jwt.sign(userToken, process.env.SECRETWORD, {
                    expiresIn: 60 * 60 * 24 * 7,
                })
                return res.status(200).send({
                    id: user.id,                    
                    token
                });
            }
        } else {
            return res.status(200).json('User or password is invalid');
        }
    } catch (error) {        
        return res.status(500).json({ error: error.message }); 
    }
}

const register = async (req, res) => {
    const { username, password } = req.body;
    try {
        if (!username || !password) {
            return res.status(422).json('Username and password are both required');
        }
        const user = await User.findOne({
            where: { username: username }
        })
        if (user) {
            return res.status(200).json('User already exists');
        } else {
            const saltRounds = 10;
            const hash = bcrypt.hashSync(password, saltRounds)
            await User.create({
                username,
                password: hash
            })
            return res.status(201).json('User created');
        }
    } catch (error) {
        return res.status(500).json({ error: error.message }); 
    }
}


module.exports = {
    login,
    register
}