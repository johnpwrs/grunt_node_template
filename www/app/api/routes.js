var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('API is Running!');
});

router.use('/user', require('./user'));

module.exports = router;
