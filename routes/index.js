var express = require('express');
var router = express.Router();

//set routes for home page
router.get('/', function (req, res, next) {
    res.render('index.html');
});

module.exports = router;