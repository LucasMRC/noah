const express = require('express');
const router = express.Router();
const passport = require('passport');

// LOGIN FORM ROUTE

router.get('/ingresar', (req, res) => {
  res.render('login');
});

// LOGIN POST ROUTE

router.post(
  '/ingresar',
  passport.authenticate('local', {
    successRedirect: '/bienvenido',
    failureRedirect: '/'
  })
);

// LOGOUT ROUTE

router.get(
  '/salir',
  /* isLoggedIn,  */ (req, res) => {
    req.logout();
    req.flash('success', '¡Nos vemos, Noé!');
    res.redirect('/');
  }
);

// WELCOME USER ROUTE

router.get(
  '/bienvenido',
  /* isLoggedIn,  */ (req, res) => {
    res.render('welcome');
  }
);

module.exports = router;
