const Product = require('../models/product');
const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: 'noah-joyas-piedras',
  api_key: '374567737891752',
  api_secret: process.env.CLOUDINARY_SECRET
});

module.exports = {
  /* `GET products index */
  async productIndex (req, res, next) {
    let products = await Product.find({});
    res.render('products/index', { products });
  },

  /* GET new product */
  productNew (req, res, next) {
    res.render('products/new');
  },

  /* POST create product */
  async productCreate (req, res, next) {
    console.log(req.file);
    let image = await cloudinary.v2.uploader.upload(req.file.path);
    req.body.product.image = {
      url: image.secure_url,
      public_id: image.public_id
    };
    await Product.create(req.body.product);
    res.redirect('/productos');
  },

  /* POST show product */
  // productShow (req, res, next) {
  //   res.send('POST /productos');
  // },

  /* GET edit product */
  async productEdit (req, res, next) {
    let product = await Product.findById(req.params.id);
    res.render('products/edit', { product });
  },

  /* PUT update product */
  async productUpdate (req, res, next) {
    let product = await Product.findById(req.params.id);
    if (req.file && product.image.public_id !== req.file.public_id) {
      await cloudinary.v2.uploader.destroy(product.image.public_id);
      product.image = {
        url: req.file.secure_url,
        public_id: req.file.public_id
      };
    }

    product.minorPrice = req.body.product.minorPrice;
    product.description = req.body.product.description;
    product.mayorPrice = req.body.product.mayorPrice;
    product.serial = req.body.product.serial;
    //  save the updated product into the db
    product.save();
    //  redirect to show page
    res.redirect('/productos');
  },

  /* DELETE update product */
  productDestroy (req, res, next) {
    res.send('DELETE /productos');
  }
};
