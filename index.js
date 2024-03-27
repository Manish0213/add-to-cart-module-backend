const connectToDatabase = require('./db');

const express = require('express')
var cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json());

const port = 5000

const path = require('path');
const uploadsPath = path.join(__dirname, 'uploads');

// Use express.static to serve the files
app.use('/uploads', express.static(uploadsPath));

connectToDatabase();

app.use('/addtocart', require('./routes/addToCart'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})