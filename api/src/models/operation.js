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
      type: DataTypes.TEXT,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING
    }
  },
  {
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  }
  );
};