const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

//passport config
require('./config/passport')(passport);

// Load routes
const auth = require('./routes/auth');
const index = require('./routes/index');

// MongoDB Connection
mongoose.connect('mongodb://localhost/StoryBooks', { useNewUrlParser: true, useUnifiedTopology: true });

// Handlebars Middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// PASSPORT CONFIGURATION
app.use(cookieParser('secret'));
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
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

var port = process.env.PORT || 8000;

app.listen(port, function () {
    console.log('Server is listening');
});