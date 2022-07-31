const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  
  sequelize.define('operation', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    released: {
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