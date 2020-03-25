const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.get('/', function(req, res){
    res.send('This is start app');
});

app.listen(8000, function(){
    console.log('Server is listening on port 8000');
});