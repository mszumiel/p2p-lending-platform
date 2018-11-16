var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/health', function(req, res, next) {
    res.send({
        version: "1.0",
        health: "OK"
    })
});

module.exports = router;
