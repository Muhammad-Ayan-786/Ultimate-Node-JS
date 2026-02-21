# Setting Up Static Files in Express

Express makes it easy to serve static files (like images, CSS, and JS) using its built-in middleware.

---

### 1. Create a `public` Folder

In your project root, make a folder named `public`:

```
your-project/
├── public/
```

---

### 2. Add Subfolders for Organization

Inside the `public` folder, create three folders:

- `images` &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;→ for all your images (PNG, JPG, SVG, etc.)
- `stylesheets` → for your CSS files
- `javascripts` → for your client-side JS scripts

```
your-project/
├── public/
│   ├── images/
│   ├── stylesheets/
│   └── javascripts/
```

For example:
```
public/
  images/logo.png
  stylesheets/style.css
  javascripts/main.js
```

---

### 3. Configure Express to Serve Static Files

In your main server file (like `app.js` or `server.js`), tell Express to use the `public` folder for static assets:

```js
const express = require('express');
const app = express();

// This line allows Express to serve files from the 'public' folder
app.use(express.static('public'));
```

Now, any file you put in `public` is accessible from the root URL!

---

### 4. Understanding the Path

- If you have `public/images/logo.png`,  
  you access it in the browser as:  
  `http://localhost:3000/images/logo.png`

- For `public/stylesheets/style.css`:  
  `<link rel="stylesheet" href="/stylesheets/style.css">`

- For `public/javascripts/main.js`:  
  `<script src="/javascripts/main.js"></script>`

You **do NOT** need to use "public" in the URL — it's automatically mapped to the root path.

---

#### Example Usage in HTML

```html
<!-- In your HTML file or template -->
<link rel="stylesheet" href="/stylesheets/style.css">
<img src="/images/logo.png" alt="Logo">
<script src="/javascripts/main.js"></script>
```

---

**Summary:**   
- Place all your static files (images, CSS, JS, etc.) in the `public` directory (organized by subfolders).
- Use `app.use(express.static('public'))` to serve them.
- Access them in your HTML with a URL path based on their location inside `public` (no "public" prefix needed).


---

### What does `../` mean?

In file paths, `../` means "go up one folder" (to the parent directory).

- For example, if you are in `public/stylesheets/` and write `../images/logo.png`, it refers to `public/images/logo.png`.
- You can use multiple `../` to move up several directories:  
  `../../file.txt` goes up two levels.

---

### Error Handling in Express (Easy Explanation)

When you build a website, sometimes things go wrong — like missing pages or mistakes in the code. Error handling means "what should Express do when something goes wrong?"

In Express:
- You can add *error handler* middleware with a special function that takes **four** arguments: `(err, req, res, next)` (notice the extra `err` at the start).
- This function gets called whenever an error happens anywhere in your app.

**Example (from your code):**
```js
app.use(function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render('error', { error: err });
});
```
- If something breaks in your routes, Express jumps to this error handler.
- It sends a "500" (server error) status, and shows an error page.

---

### Why do we put `app.use(errorHandler)` at the end?

You want Express to try **all your routes first**.  
If none of the regular routes work (or if an error happens), only then should the error handler run.

- If you put the error handler *before* your routes, it might catch things too early and your real routes wouldn’t have a chance.
- Putting it **last** means:  
  - Try all routes.
  - If an error is thrown, handle it now.

**In short:**  
Always add your error handler at the end, after other routes and middlewares.

---

### What is `headersSent`?

In Express, `res.headersSent` is a Boolean (true/false) property on the response object.  
It tells you whether Express has already started sending the HTTP headers to the browser/client.

- **Why does this matter?**  
  Once headers are sent, you can’t change the response status or set more headers.  
  That’s why, in the error handler, you check:
  ```js
  if (res.headersSent) {
    return next(err);
  }
  ```
  This means:  
  - If the response has already started going to the client, let Express’s default error handling take over (calling `next(err)` just passes the error further down the line).
  - If not, you can safely send your error page.

---

### Why do we have to pass `next()`?

In Express middleware and error handlers, `next` is a function you call to move to the next matching middleware.  
- If you don’t call `next()`, the request lifecycle stops there.

**In error handlers:**  
If you can’t handle the error (like if headers were already sent), you should pass it along by calling `next(err)`.  
This lets Express handle it with its built-in logic or a default error handler.  
If you handle it yourself (by sending a response), you don’t need to call `next()`.

---

### Does `throw new Error()` automatically call `next()`?

Not directly, but in *Express route handlers*, if you throw an error (or a rejected promise), Express will automatically catch it and call your error-handling middleware (`(err, req, res, next)`).

**Example:**
```js
app.get('/error', (req, res, next) => {
  throw new Error("Something Went Wrong!");
});
```
- Here, Express notices the thrown error and jumps to any error-handling middleware you’ve defined.

So:  
- Throwing an error in an async route, or calling `next(err)`, both send control to the error handler.

---