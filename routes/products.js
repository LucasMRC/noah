const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { asyncErrorHandler } = require('../middleware');
const {
  productNew,
  productCreate,
  // productShow,
  productEdit,
  productUpdate,
  productDestroy
} = require('../controllers/products');

// NEW PRODUCT FORM ROUTE

router.get('/nuevo', productNew);

// NEW PRODUCT POST ROUTE

router.post('/nuevo', upload.single('image'), asyncErrorHandler(productCreate));

// EDIT PRODUCT ROUTE

router.get('/:id/editar', asyncErrorHandler(productEdit));

// UPDATE PRODUCT ROUTE

router.put('/:id', upload.single('image'), asyncErrorHandler(productUpdate));

// DESTROY PRODUCT ROUTE

router.delete('/:id', asyncErrorHandler(productDestroy));

module.exports = router;
