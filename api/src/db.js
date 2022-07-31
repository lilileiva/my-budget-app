require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/budget-admin-app`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
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
const { operation, user, category } = sequelize.models;

//Relaciones
operation.belongsTo(user, { through: 'operation_user' });
user.hasMany(operation, { through: 'operation_user' });
category.belongsToMany(operation, { through: 'category_operation' });
category.belongsToMany(user, { through: 'category_user' });


module.exports = {
  ...sequelize.models,
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};