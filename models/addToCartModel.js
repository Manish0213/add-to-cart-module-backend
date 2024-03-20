const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 0 // Default quantity is 1
  },
  subtotal: {
    type: Number,
    required: true
  }
});


const CartItems = mongoose.model('CartItem', cartItemSchema);

module.exports = CartItems;
