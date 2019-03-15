// App Dependencies =============================================================================
require('dotenv').config();
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const expressSession = require('express-session');
const methodOverride = require('method-override');
const createError = require('http-errors');
const User = require('./models/user');
const flash = require('connect-flash');
const express = require('express');

// Require Routes

const indexRouter = require('./routes/index');
const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');

const app = express();

// Connect with the database

mongoose.connect('mongodb://localhost:27017/noah_database', {
  useNewUrlParser: true
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(flash());

app.use(
  expressSession({
    secret: 'leónidas & alfonsina',
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(passport.session());

// Set Locals

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

// Mount Routes

app.use('/', indexRouter);
app.use('/usuario', usersRouter);
app.use('/productos', productsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;