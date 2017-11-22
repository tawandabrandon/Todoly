var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Welcome to Todoly API, please read the documentation to get started');
});

module.exports = router;
