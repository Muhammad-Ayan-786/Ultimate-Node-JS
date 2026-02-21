const express = require('express');
const app = express();

/* <------------ Middleware ------------> */
app.use((req, res, next) => {
  console.log('Middleware 1 is running');
  next();
})

app.use((req, res, next) => {
  console.log('Middleware 2 is running');
  next();
})

/* <------------ Routes ------------> */
app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Home Page</h1>')
})

app.get('/about', (req, res) => {
  res.send('<h1>Welcome to the About Page</h1>')
})

/* <------------ Dynamic Routes ------------> */
/*
  /profile/John       |       /author.books.issued/id/4512
  /profile/Jane       |       /author.books.issued/id/6035
  /profile/Jim        |       /author.books.issued/id/2831
  /profile/Jill       |       /author.books.issued/id/6943
  /profile/Jack       |       /author.books.issued/id/8722
*/

app.get('/profile/:username', (req, res) => {
  res.send(`<h2>Hello form ${req.params.username}</h2>`)
})

app.get('/author/:username/books/issued/:id', (req, res) => {
  res.send(`<h2>Author: ${req.params.username}<br>Book id: ${req.params.id}</h2>`)
})

/* <------------ Listen to the Server ------------> */
app.listen(3000, () => {
  console.log(`Server started on port http://localhost:3000`);
})