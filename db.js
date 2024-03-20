const mongoose = require('mongoose');
const mongoUrl = 'mongodb+srv://ratnawatmanish031:HVbbiPWYyxcGTDvS@cluster0.ltayvql.mongodb.net/add-to-cart?retryWrites=true&w=majority&appName=Cluster0';
const connectToDatabase = () => {
    mongoose.connect(mongoUrl)
    .then(() => {
        console.log('connected');
    })
    .catch((err) => {
        console.error('connecion error', err);
    })
};

module.exports = connectToDatabase;