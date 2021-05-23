const mongoose = require('mongoose');
const { Schema } = mongoose;

const IngredientSchema = new Schema(
    {
      name: {
        type: String,
        trim: true,
        minlength: [1, 'Please enter the ingredient name.'],
      },
      price: {
        type: Number,
        default: 0,
      },
      time: {
        type: Number,
        default: 0,
      },
      numberOfOrders: {
          type: Number,
          default: 0,
      }
    }
);

module.exports = {
    Ingredient: mongoose.model('Ingredient', IngredientSchema),
  };