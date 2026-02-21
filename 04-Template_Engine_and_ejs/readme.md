# What is EJS?

**EJS (Embedded JavaScript)** is a templating engine for Node.js. It lets you generate HTML markup with plain JavaScript right inside your backend code.

- EJS files look a lot like regular HTML, but you can insert special tags to run JavaScript, show variables, or do logic like loops and if statements.
- *Think of EJS as "HTML with superpowers".* While normal HTML can only display static things, EJS lets you dynamically build pages, display data from your server, or perform calculations—just like you would with JavaScript.

## Why use EJS instead of plain HTML?

- Regular HTML is static—it can't "think" or use logic.
- **EJS lets you:**
  - Show information coming from your backend (like user names, lists of things, or results from a database)
  - Use JavaScript code inside your HTML (like for loops, if/else statements, or simple calculations)
  - Build pages where the content changes based on data or user input

### Example: EJS vs HTML

**HTML Example:**
```html
<!-- This will always say "Hello!" -->
<h1>Hello!</h1>
```

**EJS Example:**
```ejs
<!-- This will say hello to the user's name -->
<h1>Hello <%= userName %>!</h1>

<!-- You can even do calculations like JavaScript: -->
<p>2 + 2 = <%= 2 + 2 %></p>
```
(Here, `<%= ... %>` prints the result directly into the HTML.)

## Summary

- **EJS** is like HTML for the backend, with **more power**—it lets you code logic, use variables, and perform calculations inside your templates using JavaScript.


# EJS Setup

1. **Install EJS**

In your project directory, run:
```bash
npm install ejs
```

---

2. **Configure EJS in Express**

In your main server file (e.g., `server.js`):

```js
const express = require('express');
const app = express();

// Set EJS as the view engine
app.set("view engine", "ejs");
```

---

3. **Make a `views` folder**

Create a folder called `views` in your root project directory.  
All your EJS templates will go here.

---

4. **Add files in the `views` folder**

For example, create a file:  
`views/home.ejs`

```ejs
<!-- views/home.ejs -->
<h1>Welcome, <%= name %>!</h1>
<p>This page is rendered by EJS.</p>
```

---

5. **Use `res.render()` instead of `res.send()`**

When sending a response in your route, use `render` to output the HTML generated from your EJS template in the `views` folder.  
Make sure not to include the `.ejs` extension in the `render` function:

```js
app.get('/', (req, res) => {
  res.render('home', { name: "Mona" }); // Renders views/home.ejs (no extension required)
});
```

This tells Express to find `views/home.ejs` (don't write the `.ejs` in your render call) and use it to generate the page, filling in the provided variables.

---

# What is a Template Engine?

A **template engine** is a tool that lets you write simple markup files (usually with some extra "logic" available) which are then converted into standard HTML before being sent to the browser. Instead of building your HTML string-by-string in JavaScript, you use special template files that can directly display your data and make writing dynamic web pages much easier.

Put simply:  
> **Template engines let you mix variables, loops, and logic into HTML-like files, and then turn them into pure HTML for the browser.**

---

## Popular Template Engines

There are several template engines available for Node.js and Express:

- **EJS** (Embedded JavaScript): Looks almost exactly like traditional HTML, so it's easy for beginners to pick up.
- **Pug** (formerly Jade): Uses indentation instead of tags, a bit like Python. Has a unique, compact syntax but doesn't look like HTML.
- **Handlebars**: Uses `{{mustache}}` syntax, also a popular tool.
- **Jade**: The old name for Pug, works the same way.

### Example:  
**EJS** template looks almost like HTML:

```ejs
<h1>Hello, <%= user %>!</h1>
```

**Pug (Jade)** template for the same:

```pug
h1 Hello, #{user}!
```
*Notice how Pug has no HTML tags and relies on indentation, similar to how Python code blocks work.*

---

## Summary

Think of a template engine as a custom markup language, usually very similar to HTML, that makes generating dynamic web pages much easier. You write the template (with a mix of HTML and variables/logic), and your server turns it into a regular HTML page for the user.