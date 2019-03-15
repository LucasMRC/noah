const express = require('express');
const router = express.Router();
const Products = require('../models/product');
const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

//  Storage Configuration

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'Fotos de productos',
  allowedFormats: ['jpg', 'png'],
  transformation: [{ width: 500, height: 500, crop: 'limit' }],
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + new Date());
  }
});
const parser = multer({ storage: storage });

//  Cloudinary Configuration

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

// PRODUCTS ROUTE

router.get('/', (req, res) => {
  Products.find({}, (err, products) => {
    if (err) {
      console.log(err);
    } else {
      res.render('products', { products: products });
    }
  });
});

// NEW PRODUCT FORM ROUTE

router.get(
  '/nuevo',
  /* isLoggedIn,  */ (req, res, next) => {
    res.render('upload');
  }
);

// NEW PRODUCT POST ROUTE

router.post(
  '/nuevo',
  /* isLoggedIn,
   */ parser.single('image'),
  (req, res, next) => {
    const newProduct = {
      image: req.file.secure_url,
      description: req.body.description,
      serial: req.body.serial,
      price: req.body.price,
      type: req.body.type
    };
    Products.create(newProduct, (err, product) => {
      if (err) {
        req.flash(
          'error',
          'Ha habido un error, por favor intente nuevamente más tarde'
        );
        console.log(err);
      } else {
        req.flash('success', '¡Producto subido con éxito!');
        console.log(product);
        res.redirect('/productos');
      }
    });
  }
);

// EDIT PRODUCT ROUTE

router.get(
  '/editar/:id',
  /* isLoggedIn,  */ (req, res, next) => {
    Products.findById(req.params.id, (err, product) => {
      if (err) {
        req.flash('error', 'Producto no encontrado');
        console.log(err);
      } else {
        res.render('edit', { product: product });
      }
    });
  }
);

// UPDATE PRODUCT ROUTE

router.put(
  '/:id',
  /* isLoggedIn,  */ parser.single('image'),
  (req, res, next) => {
    const newProduct = {
      image: req.file.secure_url,
      description: req.body.description,
      serial: req.body.serial,
      price: req.body.price,
      type: req.body.type
    };
    Products.findOneAndUpdate(
      { _id: req.params.id },
      newProduct,
      (err, updatedProduct) => {
        if (err) {
          req.flash(
            'error',
            'Man, ahora no vas a poder editar el producto. Mala mía. ¡Probá después!'
          );
          console.log(err);
        } else {
          console.log(updatedProduct);
          req.flash('success', '¡Producto actualizado!');
          res.redirect('/productos');
        }
      }
    );
  }
);

// DESTROY PRODUCT ROUTE

router.delete(
  '/:id',
  /* isLoggedIn,  */ (req, res, next) => {
    Products.findByIdAndRemove(req.params.id, err => {
      if (err) {
        console.log(err);
      } else {
        req.flash('success', '¡Producto Eliminado!');
        res.redirect('/productos');
      }
    });
  }
);

module.exports = router;
