const express = require('express')
const router = express.Router();
// const bodyParser = require('body-parser');
const cartItems = require('../models/addToCartModel');
const Products = require('../models/productModel');
const upload = require('../middleware/multer.middleware.js');
// router.use(bodyParser.json());

router.post('/addItem', async (req, res) => {
    const {productId,action} = req.body;
    try {
        const cartItem = await cartItems.findOne({ product: productId }).populate('product');
        console.log(cartItem);

        if (cartItem) {
            // If the product is already in the cart, increase its quantity
            if (action === 'increase') {
                // Increase the quantity
                cartItem.quantity += 1;
            } else if (action === 'decrease' && cartItem.quantity > 1) {
                // Decrease the quantity if greater than 1
                cartItem.quantity -= 1;
            }
            cartItem.subtotal = cartItem.quantity * cartItem.product.price;
            const updatedItem = await cartItem.save();
            res.status(201).json(updatedItem);
        } else {
            const product = await Products.findById({ _id: productId });
            console.log(product);
            // If the product is not in the cart, create a new cart item
            const addedItem = await cartItems.create({ product: productId, quantity: 1, subtotal: product.price });
            await addedItem.populate('product');
            res.status(201).json(addedItem);
        }
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ error: 'Error adding product to cart' });
    }
});

router.post('/addProduct', upload.single('imagePath'), async (req, res) => {
    // const newItem = req.body;
    const {title,price,description} = req.body;
    try {
        const imageFile = req.file;
        const addedItem = new Products({title,price,description,imagePath: imageFile ? imageFile.filename : null});
        const savedItem = await addedItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
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

router.get('/fetchProducts', async (req,res) => {
    try{
        const allProducts = await Products.find();
        res.json(allProducts);
    } catch (error) {
        console.log('error fetching products:', error);
    }
})
module.exports = router;