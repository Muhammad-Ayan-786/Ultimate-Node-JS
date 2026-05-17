var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  req.session.banned = true
  res.render('index', { title: 'Session & Cookie' });
});

router.get('/checkbanned', (req, res) => {
  if (req.session.banned === true) {
    res.send('<h1>You Are Baned</h1>')
  }
  console.log(req.session)
  res.send('Check your Console');
});

module.exports = router;
