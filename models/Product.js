const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0.0,
  },
});

module.exports = Product;
