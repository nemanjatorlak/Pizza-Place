const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      price: {
        type: Number,
        default: 0,
      },
      ingredients: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Ingredient',
        },
      ],
      orderPlacedAt: {
        type: Number,
        default: 0,
      },
      totalOrderTime: {
          type: Number,
          default: 0,
      },
      completed: Boolean,
    },
    {
    timestamps: true,
    }
);

module.exports = {
    Order: mongoose.model('Order', OrderSchema),
  };