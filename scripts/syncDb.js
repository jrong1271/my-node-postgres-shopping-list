const sequelize = require("../config/database");
const User = require("../models/User");
const Product = require("../models/Product");
const UserProducts = require("../models/UserProducts");
const { bobNexusShoppingList, arnoldBumsteadShoppingList } = require("../data/data.ts");


const syncDb = async () => {
  try {
    await sequelize.sync({ force: true }); // Drops and recreates tables
    console.log("Database Synced!");

    const [user1] = await User.findOrCreate({
      where: { name: "Arnold Bumstead", email: "arnold@example.com" },
      default: { name: "Arnold Bumstead", email: "arnold@example.com" }
    });
    for (const product of arnoldBumsteadShoppingList) {
      await Product.create(product).then((product) => {
        console.log(`${product.name} created`)
        UserProducts.create({ userId: user1.id, productId: product.id, quantityOwned: product.quantity }).then(() => {
          console.log(`Product ${product.name} assigned to ${user1.name}`);
        });
      });
    }
    
    const [user2] = await User.findOrCreate({
      where: {name: "Bob Nexus", email: "bob@example.com"},
      default: { name: "Bob Nexus", email: "bob@example.com" },
    });
    for (const product of bobNexusShoppingList) {
      await Product.create(product).then((product) => {
        console.log(`${product.name} created`)
        UserProducts.create({ userId: user2.id, productId: product.id, quantityOwned: product.quantity }).then(() => {
          console.log(`Product ${product.name} assigned to ${user2.name}`);
        });
      });
    }

    console.log("Sample Data Inserted!");
    process.exit();
  } catch (error) {
    console.error("Error syncing database:", error);
  }
};

syncDb();
