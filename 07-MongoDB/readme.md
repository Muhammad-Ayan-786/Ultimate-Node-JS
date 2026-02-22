# What is a Database?

A **database** is a place where we store and manage data so that it can be easily accessed, updated, and organized.

---

## Types of Databases

There are mainly **two types** of databases:

| Relational Databases | Non-Relational Databases (NoSQL) |
|----------------------|-----------------------------------|
| MySQL                | MongoDB                           |
| SQL                  |                                   |

- **Relational Databases** store data in tables with rows and columns. They use Structured Query Language (**SQL**) for managing data.
- **Non-Relational Databases (NoSQL)** like **MongoDB** store data in a flexible, JSON-like format, which is more suitable for handling different kinds of data.

---

## Mapping: Code Terms vs. MongoDB Terms

Here's a simple comparison to understand how concepts you might know from regular coding map to MongoDB:

| Code Side          | MongoDB Side   | Explanation                                 |
|--------------------|---------------|---------------------------------------------|
| DB Setup     | DB Formation      | Creating a new database to store your info  |
| Model              | Collection    | A group/table for similar kinds of data     |
| Schema             | Document      | An individual record or piece of data       |

- **DB Setup/DB Formation:** Think of it as starting a new storage space.
- **Model/Collection:** A "Collection" is like a folder or table where similar data is kept.
- **Schema/Documents:** In MongoDB, a "Document" is a single entry—like a row in a relational database.

MongoDB uses these flexible, easy-to-understand concepts to help you work with lots of different types of data!

# How to Set Up MongoDB with Mongoose in `routes/users.js`:

1. **Install Packages**  
   - Run `npm install mongodb mongoose` to install MongoDB and Mongoose.

2. **Require and Connect**  
   - In your main server file (e.g., `app.js`), require mongoose and connect:
     ```js
     const mongoose = require('mongoose');
     mongoose.connect('mongodb://localhost:27017/yourDBname');
     ```

3. **Define a Schema**  
   - In `routes/users.js` or a separate `models` folder:
     ```js
     const mongoose = require('mongoose');
     const UserSchema = mongoose.Schema({
       username: String,
       email: String
     });
     ```

4. **Create and Export a Model**  
   - Still in `users.js` or your model file:
     ```js
     const User = mongoose.model('User', UserSchema);
     module.exports = User;
     ```

Now you’re ready to use MongoDB and Mongoose to store and retrieve user data!


✨ **Quick Guide: Setting Up MongoDB with Mongoose** ✨

---

1. **Connecting to Your Database**

   - `127.0.0.1` means **localhost** (your computer).
   - `27017` is the **default port** MongoDB uses.

   ```js
   mongoose.connect('mongodb://127.0.0.1:27017/practiceDataBase');
   // This connects to (or creates) a database named 'practiceDataBase'
   ```

---

2. **Defining the Schema**

   - **A Schema is like a blueprint** for your data—what each user "document" should contain.

   ```js
   const userSchema = mongoose.Schema({
     username: String,
     name: String,
     age: Number
   });
   // This describes the structure of a user document (like fields in a form)
   ```

---

3. **Creating the Collection (Model)**

   - **A Model** turns your schema into a collection you can use in your code!
   - The first parameter is **the name of your collection** in the String form.

   ```js
   const User = mongoose.model("user", userSchema);
   // This creates a 'user' collection using the userSchema blueprint
   ```

---

🌟 **Summary:**
- Connect to the database ➡️ Define how your data looks ➡️ Create the collection!
- Now you can easily save, find, or update user data with Mongoose!


# CRUD Operations (MongoDB) Explained

**CRUD stands for**:
- **C**reate: Add new data
- **R**ead: Retrieve data
- **U**pdate: Modify existing data
- **D**elete: Remove data


With Mongoose and Express, you can easily perform CRUD operations (Create, Read, Update, Delete) with your User model. Here’s what each piece of code does:

**1. Creating a User**

When someone visits the `/create` route, this code creates (inserts) a new user document into the database with the given details. The operation is asynchronous and returns the newly created user as the response.

```js
router.get('/create', async function (req, res, next) {
  const createdUser = await useModel.create({
    username: 'Mohammad Ayan',
    name: 'Mohammad Ayan Asim',
    age: 17
  }); // Creates the user in the database
  res.send(createdUser); // Sends the created user as the response
});
```

**2. Reading Users**

- `/allUsers` finds (reads) *all* users in the collection and returns them as an array.
- `/foundUser` finds (reads) *one* user whose `username` matches "Mohammad Ayan". If no user is found, you’ll get `null`.

```js
router.get('/allUsers', async (req, res) => {
  let allUsers = await useModel.find(); // Finds ALL user documents
  res.send(allUsers);
});

router.get('/foundUser', async (req, res) => {
  let findUser = await useModel.findOne({
    username: 'Mohammad Ayan'
  }); // Finds ONE user with this username
  res.send(findUser); // Sends the found user (or null if not found)
});
```

**3. Deleting a User**

When someone visits the `/delete` route, this finds a user by `username` and deletes them from the database. The deleted user’s data is sent as the response.

```js
router.get('/delete', async (req, res) => {
  let deletedUser = await useModel.findOneAndDelete({
    username: 'Mohammad Ayan'
  }); // Deletes the user and returns it
  res.send(deletedUser);
});
```

**🔄 Note:**  
All these operations are asynchronous (they take some time to talk to the database). That’s why they use `async`/`await` for handling promises!

Now you know how to Create, Read, and Delete data with Mongoose and Express!