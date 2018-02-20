var express = require('express');
var router = express.Router();

// GET Start Screen
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/index', function(req, res, next) {
  res.render('index');
});

// GET Connecet Screen
router.get('/connect', function(req, res, next) {
  res.render('waiting');
});

// GET Game Screen
router.get('/match', function(req, res, next) {
  res.render('game');
});

module.exports = router;
