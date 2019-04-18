const express = require('express');
const router = express.Router();
const {
  postNewsletter,
  postMessage,
  getContact,
  getIndex,
  getLoginForm,
  postLogin
} = require('../controllers');

// INDEX ROUTE

router.get('/', getIndex);

// NEWSLETTER POST ROUTE

router.post('/', postNewsletter);

// CONTACT ROUTE

router.get('/contacto', getContact);

// MESSAGE POST ROUTE

router.post('/contacto', postMessage);

// LOGIN FORM ROUTE

router.get('/ingresar', getLoginForm);

// LOGIN POST ROUTE

router.post('/ingresar', postLogin);

module.exports = router;
