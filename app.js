const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
const uri = "mongodb+srv://Admin:Admin@cluster0.f6q8e.mongodb.net/PizzaPlace?retryWrites=true&w=majority";
const port = process.env.PORT || 8080;

const OrdersController = require('./Components/Public/ordersController');

let app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
})

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.json());
app.use(express.static('public'));

const PublicRoutes = require('./Components/Public/ordersRoutes');

// Create the database connection
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection.on('connected', () => {
  console.log(`Mongoose default connection open.`);
});

// CONNECTION EVENTS
// If the connection throws an error
mongoose.connection.on('error', (err) => {
  console.log(`Mongoose default connection error: ${err}`);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected');
});

// When the connection is open
mongoose.connection.on('open', () => {
  console.log('Mongoose default connection is open');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

app.use('/public', PublicRoutes);

app.listen(port, () => {
  console.log(`Pizza Place listening at http://localhost:${port}`)
})