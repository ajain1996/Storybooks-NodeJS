const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();

//passport config
require('./config/passport')(passport);

// Load routes
const auth = require('./routes/auth');

app.get('/', function(req, res){
    res.send('This is start app');
});

// Use routes
app.use('/auth', auth);

var port = process.env.PORT || 8000;

app.listen(port, function(){
    console.log('Server is listening');
});