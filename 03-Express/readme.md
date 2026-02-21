# Express.js

> **Express** is a popular web framework for Node.js. Think of it as a toolkit that makes building web servers and APIs much easier.

---

## Why Use Express?

Without Express, you'd have to write a lot of code to handle every little detail of your web server (parsing URLs, handling different request types, sending responses, etc.). Express gives you simple functions to do all of this so you can focus on your app's logic.

**Express is mainly used for Routing** — and that's what we'll explore next.

---

## What is Routing?

**Routing** simply means: *"When someone visits this URL, run this code."*

### The Restaurant Analogy

Imagine a restaurant:

- Customer asks for **"Pizza"** → Waiter takes them to the pizza section
- Customer asks for **"Drinks"** → Waiter takes them to the drinks section
- Customer asks for **"Dessert"** → Waiter takes them to the dessert section

**Routing works the same way:**

| URL Path   | What Happens       |
|-----------|--------------------|
| `/`       | Show home page     |
| `/about`  | Show about page    |
| `/users`  | Show list of users |
| `/contact`| Show contact form  |

### In Simple Terms

1. **User visits a URL** (e.g. `yoursite.com/products`)
2. **Express checks** which route matches that URL
3. **Express runs the code** you wrote for that route
4. **User gets the response** (a page, JSON data, etc.)

### Example

```javascript
// When user goes to the homepage "/"
app.get('/', (req, res) => {
  res.send('Welcome to my site!');
});

// When user goes to "/about"
app.get('/about', (req, res) => {
  res.send('This is the about page.');
});
```
---

## Key Takeaways

- **Route** = URL path + HTTP method (GET, POST, etc.) + what to do
- **Routing** = The system that decides *which* code runs for *which* URL
- **Express** = Makes routing (and much more) simple and clean

## GET vs POST: Seeing Data in the URL

When handling data with Express routes, it's important to understand the difference between **GET** and **POST** requests:

### GET route: Data *is visible* in the URL

When you send data using a GET request, the data appears in the URL as query parameters.

**Example:**

Visiting:  
`http://yoursite.com/search?term=dog&sort=popular`

Example GET route in Express:
```javascript
app.get('/search', (req, res) => {
  // Query data is in req.query
  res.send(`You searched for: ${req.query.term}`);
});
```

- The browser displays the full URL, including data (`?term=dog&sort=popular`).
- GET requests are commonly used for searching and retrieving data.

---

### POST route: Data is *not visible* in the URL

When you send data using a POST request (e.g., submitting a form), the data is **not** displayed in the URL. Instead, it's sent in the request "body".

Example POST route in Express:
```javascript
app.post('/submit', (req, res) => {
  // Form data is in req.body (need body-parser or express.json() middleware)
  res.send(`Form data received: ${JSON.stringify(req.body)}`);
});
```

- The URL stays the same (`/submit`)—no user data is shown in the address bar.
- POST requests are commonly used for storing data, creating accounts, etc.

---

**Summary Table**

| HTTP Method | Where is data?              | Data visible in URL?   | Typical use          |
|-------------|-----------------------------|------------------------|----------------------|
| GET         | In URL query string         | **Yes**                | Retrieve, search     |
| POST        | In request body (not URL)   | **No**                 | Create, submit forms |

---

## Understanding Middleware in Express

**Middleware** are functions that execute during the request-response cycle in Express. They have access to the `req`, `res`, and `next` objects:

- **`req`**: The request object, containing information about the HTTP request (like URL, query strings, body, headers, etc.).
- **`res`**: The response object, used to send data back to the client.
- **`next`**: A function that, when called, passes control to the next middleware in the stack. If you don't call `next()`, the request will "hang".

You can have multiple middleware functions. Each can take action (e.g., logging, authentication, parsing body data), then pass control to the next middleware or route handler.

**Basic Middleware Example:**
```javascript
app.use((req, res, next) => {
  console.log('This always runs!');
  next(); // Proceed to the next middleware or route
});
```

**Multiple Middleware:**
```javascript
// Middleware 1
app.use((req, res, next) => {
  console.log('Middleware 1');
  next();
});

// Middleware 2
app.use((req, res, next) => {
  console.log('Middleware 2');
  next();
});

app.get('/', (req, res) => {
  res.send('Check your console to see middleware output!');
});
```

When you visit `/`, you'll see both middleware messages in your console, showing that they both ran before the route handler.

---

**Summary:**

- Middleware functions can log, authenticate, parse data, etc.
- Use `req` to access request data, `res` to send a response, and `next()` to move to the next middleware or handler.
- You can stack as many middleware as you need for each route or globally for all routes.

Learn more in the [Express Middleware documentation](https://expressjs.com/en/guide/using-middleware.html).

---

## Understanding Dynamic Routes in Express

Dynamic routes allow you to capture values from the URL using route parameters. In Express, you define a dynamic segment in your route path using a colon `:` followed by the parameter name. This makes it possible to create routes that match patterns or user-specific paths.

**Example of a Dynamic Route:**
```javascript
app.get('/profile/:username', (req, res) => {
  res.send(`Hello, ${req.params.username}!`);
});
```
- Here, `:username` is a *route parameter*. Any value in that part of the URL (e.g. `/profile/John`, `/profile/Jane`) will be captured.
- The value is accessible in the route handler as `req.params.username`.

You can have multiple dynamic parameters:
```javascript
app.get('/author/:username/books/issued/:id', (req, res) => {
  res.send(`Author: ${req.params.username}, Book ID: ${req.params.id}`);
});
```
In this route:
- `:username` and `:id` are dynamic route parameters.
- Visiting `/author/Bob/books/issued/1234` will set `req.params.username === "Bob"` and `req.params.id === "1234"`.

**Key Points:**
- The colon (`:`) tells Express that part of the URL is a variable parameter.
- All extracted parameters from the URL are gathered inside the `req.params` object.
- Dynamic routes are great for user profiles, product pages, item details, etc.

**Reference:**
- [Express Routing Documentation](https://expressjs.com/en/guide/routing.html#route-parameters)
