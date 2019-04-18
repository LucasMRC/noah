// Require Dependencies =============================================================================
require('dotenv').config();

const mongoose = require('mongoose'),
   createError = require('http-errors'),
        engine = require('ejs-mate'),
      passport = require('passport'),
 LocalStrategy = require('passport-local'),
        logger = require('morgan'),
  cookieParser = require('cookie-parser'),
          path = require('path'),
       session = require('express-session'),
methodOverride = require('method-override'),
          User = require('./models/user'),
       express = require('express');

// Require Routes

const indexRouter = require('./routes/index'),
   productsRouter = require('./routes/products'),
      usersRouter = require('./routes/users');

const app = express();

// Connect with the database

mongoose.connect(
  'mongodb://localhost:27017/noah_database', {
    useNewUrlParser: true 
  });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to the database!');
});

// use ejs-locals for all ejs templates:
app.engine('ejs', engine);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.use(
  session({
    secret: 'leónidas & alfonsina',
    resave: false,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(passport.session());

// Local Variables Middleware ==============================

app.use(function(req, res, next){
  // set default page title
  req.user = { 
    '_id' : '5cb76bff9d0494008acb5c00', 
    'username' : 'lucas'
  };
  res.locals.currentUser = req.user;
  res.locals.title   = 'NOAH';
  // set success flash message
  res.locals.success = req.session.success || '';
  delete req.session.success;
  // set error flash message
  res.locals.error = req.session.error || '';
  delete req.session.error;
  // continue on to the next function in middleware chain
  next();
});

// Mount Routes

app.use('/', indexRouter);
app.use('/productos', productsRouter);
app.use('/:user_id', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  /* res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; */

  // render the error page
  // res.status(err.status || 500);
  // res.render('error');
  console.log(err);
  req.session.error = err;
  res.redirect('back');
});

module.exports = app;
