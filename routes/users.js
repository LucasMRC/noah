const express = require('express');
const router = express.Router();
const { getLogout, getWelcome } = require('../controllers/users');
// const passport = require('passport');

// WELCOME USER ROUTE

router.get('/', getWelcome);

// LOGOUT ROUTE

router.get('/salir', getLogout);

module.exports = router;
