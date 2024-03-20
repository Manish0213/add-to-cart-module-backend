const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const cartItems = require('../models/addToCartModel');
const Products = require('../models/productModel');

router.use(bodyParser.json());

router.post('/addItem', async (req, res) => {
    const { productId } = req.body;
    try {
        const cartItem = await cartItems.findOne({ product: productId }).populate('product');
        console.log(cartItem);

        if (cartItem) {
            // If the product is already in the cart, increase its quantity
            cartItem.quantity += 1;
            cartItem.subtotal = cartItem.quantity * cartItem.product.price;
            const updatedItem = await cartItem.save();
            res.status(201).json(updatedItem);
        } else {
            // If the product is not in the cart, create a new cart item
            const addedItem = await cartItems.create({ product: productId, quantity: 0, subtotal: 0 });
            await addedItem.populate('product');
            res.status(201).json(addedItem);
        }
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ error: 'Error adding product to cart' });
    }
});

router.post('/addProduct', async (req, res) => {
    const newItem = req.body;
    try {
        // Create a new product instance using the request body
        const addedItem = new Products(newItem);
        
        // Save the new product to the database
        const savedItem = await addedItem.save();
        
        // Send a success response with the saved item
        res.status(201).json(savedItem);
    } catch (error) {
        // Handle any errors
        res.status(500).json({ message: error.message });
        console.log(error);
    }
});

router.get('/fetchCartItems', async (req,res) => {
    try {
        const allCartItems = await cartItems.find().populate('product'); // Assuming you use Mongoose for MongoDB
        res.json(allCartItems);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ error: 'Error fetching cart items' });
    }
})

module.exports = router;