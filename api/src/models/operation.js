const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  
  sequelize.define('Operation', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
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