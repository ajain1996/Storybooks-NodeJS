const express = require('express');
const router = express.Router();
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');
const Story = require('../models/Story');

router.get('/', ensureGuest, function (req, res) {
    res.render('index/welcome');
});

router.get('/about', function(req, res) {
    res.render('index/about');
});

router.get('/dashboard', ensureAuthenticated, function(req, res) {
    Story.find({user: req.user.id})
    .then(stories => {
        res.render('index/dashboard', {
            stories: stories,
        });
    });
});

module.exports = router;