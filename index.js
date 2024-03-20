const connectToDatabase = require('./db');

const express = require('express')
const app = express()
const port = 5000

connectToDatabase();

app.use('/addtocart', require('./routes/addToCart'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})