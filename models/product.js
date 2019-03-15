const mongoose = require('mongoose');

// Product Schema

let productSchema = new mongoose.Schema({
  image: String,
  description: String,
  serial: String,
  price: Number,
  type: String
});

// Module Exports

module.exports = mongoose.model('Product', productSchema);
