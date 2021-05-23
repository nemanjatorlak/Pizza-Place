const mongoose = require('mongoose');
const { Schema } = mongoose;

const PizzaSchema = new Schema(
    {
      type: {
        type: String,
        enum: ['Small', 'Medium', 'Large']
      },
      price: {
        type: Number,
        default: 0,
      },
      time: {
        type: Number,
        default: 0,
      }
    },
);

module.exports = {
    Pizza: mongoose.model('Pizza', PizzaSchema),
  };