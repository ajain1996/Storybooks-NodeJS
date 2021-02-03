const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
// const path = require('path');
const bodyParser = require('body-parser');
// const moment = require('moment');
const flash = require("connect-flash")
const methodOverride  = require('method-override');
const firebase = require('./firebase');

const app = express();
app.use(flash());

// Adminbro
const admin = require('./routes/adminbro');
app.use('/admin', admin);

//passport config
require('./config/passport')(passport);

// Set static
app.use('/static', express.static("public"));

// Body Parser middleware
app.use(methodOverride('_method'));

// Use bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Load routes
const auth = require('./routes/auth');
const index = require('./routes/index');
const stories = require('./routes/stories');

// MongoDB Connection
mongoose.connect('mongodb://localhost/StoryBooks', { useNewUrlParser: true, useUnifiedTopology: true });

// App Engine
app.set('view engine', 'ejs');

// PASSPORT CONFIGURATION
app.use(cookieParser('secret'));
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}));

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Set global vars
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

// Use routes
app.use('/', index);
app.use('/auth', auth);
app.use('/stories', stories);

var port = process.env.PORT || 8000;

app.listen(port, function () {
    console.log('Server is listening on port ' + port);
});