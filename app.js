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

app.listen(8000, function(){
    console.log('Server is listening on port 8000');
});