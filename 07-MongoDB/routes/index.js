var express = require('express');
var router = express.Router();
const useModel = require('./users');

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { title: 'MongoDB' });
});

/* <---------- CURD OPERATION (MongoDB) ----------> */

// Creating a User
router.get('/create', async function (req, res, next) {
  const createdUser = await useModel.create({
    username: 'Mohammad Ayan',
    name: 'Mohammad Ayan Asim',
    age: 17
  }); // This is Asynchronous
  res.send(createdUser)
  // "Creation Completed !"
});

// Basic Reading [ find() & findOne() ]
router.get('/allUsers', async (req, res) => {
  let allUsers = await useModel.find() // This is Asynchronous
  res.send(allUsers)
})

router.get('/foundUser', async (req, res) => {
  let findUser = await useModel.findOne({
    username: 'Mohammad Ayan'
  }) // This is Asynchronous
  res.send(findUser)

  // if no user found, u'll get 'null'
})

// Delete User
router.get('/delete', async (req, res) => {
  let deletetUser = await useModel.findOneAndDelete({
    username: 'Mohammad Ayan'
  }) // This is Asynchronous
  res.send(deletetUser)
})

// Anything related to userModel is Asynchronous

module.exports = router;