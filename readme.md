Create a model(s) (data structure) for shopping list
use sequelize nodejs ORM to interact with postgreSQL database

Checklists:
- [x] create a postgreSQL data model in a react.js app
- [x] create a data structure for the shopping list
  - A user can have multiple products.
  - A product can belong to multiple users.
  - A junction table (UserProducts) is required to track which users own which products.
  ![image](./database%20table.png)
- [x] store the shopping lists and items to the database
- [x] modify the database such that a price field can be stored for each item
  ![image](./product.png)
- [ ] multiply the quantity of each item in the shopping lists by two
- [ ] create API endpoints to dynamically get a list of shopping lists and items