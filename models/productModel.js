const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  imagePath: {
      type: String,
  }
});

const Products = mongoose.model('Product', productSchema);

module.exports = Products;
