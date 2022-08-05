const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  
  sequelize.define('Transaction', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    concept: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  }
  );
};