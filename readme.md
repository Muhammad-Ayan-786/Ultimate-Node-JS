# Express Generator

Express Generator is a handy tool that scaffolds out a complete Express application, following the standard architecture. It quickly creates necessary folders and files for building robust Express apps.

## Steps to Use

1. **Install express-generator globally:**

    ```bash
    npm i express-generator -g
    ```

2. **Create a new Express app (replace `*appname` with your desired app name):**

    ```bash
    express *appname --view=ejs
    ```

3. **Navigate into your app's directory and install dependencies:**

    ```bash
    cd *appname
    npm i
    ```

Your Express app is now ready! You can start developing your backend logic, routes, views, and more as per your project needs.

---

# Additional Notes

- When initializing your Express app with `express-generator`, the tool scaffolds your app into a subfolder (the app's name).
- In the generated `routes/index.js`, you will see usage of `router.get(...)` instead of the more basic `app.get(...)`. This modular approach is best practice for route handling.

### Example of route definition in `routes/index.js`:
```js
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
```

- To start the server in your generated app, you can use nodemon for automatic server restarts:

```bash
npx nodemon
```
  > **Note:** You do **not** need to specify the filename (such as `npx nodemon filename`). The generated `package.json` defines the default start command, so `npx nodemon` will automatically use the appropriate entrypoint script.

---