const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index'); // Render the index.ejs file
});

app.get('/about', (req, res) => {
  res.render('about', { name: 'Ayan' }); // Passing the Data
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.listen(3000, () => {
  console.log('Server is running on port https://localhost:3000');
});