const express = require("express");
const sequelize = require("./config/database");
const User = require("./models/User");
const UserProducts = require("./models/UserProducts");
const Product = require("./models/Product");

const app = express();
app.use(express.json()); // Middleware to parse JSON

// Define the GET endpoint to retrieve a list of shopping lists and items
/**
 * @route GET /products
 * @description Retrieve a list of all users from the database.
 * @access Public
 * @returns An array of shopping list and items.
 * @throws {Error} If there is an issue retrieving users from the database.
 */

app.get("/list/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const usersWithProducts = await User.findAll({
      where: {
        id: userId,
      },
      include: {
        model: Product,
      },
    });
    // Format the result to group products by user
    const formattedResult = usersWithProducts.map(user => ({
      id: user.id,
      name: user.name,
      description: user.name + `'s shopping list`,
      email: user.email,
      items: user.Products.map(product => ({
        id: product.id,
        name: product.name,
        quantity: product.UserProducts.quantityOwned,
        price: product.price,
      })),
    }));

    res.json(formattedResult);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/users/:userId/products", async (req, res) => {
  const { userId } = req.params;
  try {
    const userWithProducts = await User.findByPk(userId, {
      include: {
        model: Product,
        through: { attributes: ["userId", "quantityOwned"] },
      },
    });

    if (!userWithProducts) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(userWithProducts.Products);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/users/:userId/products/:productId", async (req, res) => {
  const { userId, productId } = req.params;
  try {
    const userProduct = await UserProducts.findOne({
      where: {
        userId: userId,
        productId: productId,
      },
    });

    if (!userProduct) {
      return res.status(404).json({ error: "User or Product not found" });
    }

    res.json(userProduct);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
);

app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to create a user
app.post("/users", async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.create({ name, email });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
});

const PORT = process.env.PORT || 3000;

sequelize
  .sync()
  .then(() => {
    console.log("Database connected!");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("Database sync error:", err));
