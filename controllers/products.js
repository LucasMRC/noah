const Product = require('../models/product');
const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: 'noah-joyas',
  api_key: '522312877148848',
  api_secret: process.env.CLOUDINARY_SECRET
});

module.exports = {
  /* GET new product */
  productNew (req, res, next) {
    res.render('products/new');
  },

  /* POST create product */
  async productCreate (req, res, next) {
    console.log(req.file);
    // upload image to cloudinary
    let image = await cloudinary.v2.uploader.upload(req.file.path);
    // add image to product
    req.body.product.image = {
      url: image.secure_url,
      public_id: image.public_id
    };
    console.log(req.body.product);
    // create product
    await Product.create(req.body.product);
    // redirect to index page
    res.redirect('/');
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
    // check if image is changed
    if (req.file && product.image.public_id !== req.file.public_id) {
      // delete old image from cloudinary
      await cloudinary.v2.uploader.destroy(product.image.public_id);
      // create new image
      product.image = {
        url: req.file.secure_url,
        public_id: req.file.public_id
      };
    }
    // set other properties
    product.minorPrice = req.body.product.minorPrice;
    product.description = req.body.product.description;
    product.mayorPrice = req.body.product.mayorPrice;
    product.serial = req.body.product.serial;
    //  save the updated product into the db
    product.save();
    //  redirect to show page
    res.redirect('/');
  },

  /* DELETE update product */
  async productDestroy (req, res, next) {
    let product = await Product.findById(req.params.id);
    // delete image from cloudinary
    await cloudinary.v2.uploader.destroy(product.image.public_id);
    // delete post
    product.remove();
    // redirect to index
    res.redirect('/');  
  }
}
