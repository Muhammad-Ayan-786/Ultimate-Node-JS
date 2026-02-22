var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express', message: 'Architecture is created by express-generator' });
});

module.exports = router;
