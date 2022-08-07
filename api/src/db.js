require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST, DATABASE_URL } = process.env;


// const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/personal-budget`, {
const sequelize = new Sequelize(`${DATABASE_URL}`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

const basename = path.basename(__filename);


const modelDefiners = [];

// obtengo los modelos de /models, y los agrego al array modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);


// Importo los models
const { Transaction, User, Category } = sequelize.models;

//Relations
/*----(Operation/User)----*/
Transaction.belongsTo(User, {
  foreignKey: 'userId',
  targetId: 'id'
});

User.hasMany(Transaction, {
  foreignKey: 'userId',
  sourceKey: 'id'
});

/*----(Operation/Category)----*/
Transaction.belongsTo(Category, {
  foreignKey: 'categoryId',
  targetId: 'id'
});

Category.hasMany(Transaction, {
  foreignKey: 'categoryId',
  sourceKey: 'id'
});
/*--------*/


module.exports = {
  ...sequelize.models,
  connection: sequelize,     // para importart la conexión { conn } = require('./db.js');
};