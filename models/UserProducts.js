const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Product = require("./Product");

const UserProducts = sequelize.define("UserProducts", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
      key: "id",
    },
  },
  quantityOwned: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

// Define Many-to-Many Relationship
User.belongsToMany(Product, { through: UserProducts, foreignKey: "userId" });
Product.belongsToMany(User, { through: UserProducts, foreignKey: "productId" });

module.exports = UserProducts;
