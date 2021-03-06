const mongoose = require('mongoose');

// Product Schema

let productSchema = new mongoose.Schema({
  image: {
    url: String,
    public_id: String
  },
  description: String,
  serial: String,
  minorPrice: String,
  mayorPrice: String,
  type: String
});

// Module Exports

module.exports = mongoose.model('Product', productSchema);
