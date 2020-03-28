const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.render('index/welcome');
});

router.get('/dashboard', function(req, res) {
    res.render('index/welcome');
});

module.exports = router;