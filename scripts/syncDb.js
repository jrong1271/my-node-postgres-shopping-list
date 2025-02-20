const sequelize = require("../config/database");
const User = require("../models/User");

const syncDb = async () => {
  try {
    await sequelize.sync({ force: true }); // Recreate tables
    console.log("Database synced!");

    // Seed data
    await User.create({ name: "John Doe", email: "john@example.com" });
    console.log("User added!");
    
    process.exit();
  } catch (error) {
    console.error("Error syncing database:", error);
  }
};

syncDb();
