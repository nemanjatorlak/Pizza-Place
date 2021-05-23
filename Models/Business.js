const mongoose = require('mongoose');
const { Schema } = mongoose;

const BusinessSchema = new Schema(
    {
      earnings: {
        type: Number,
        default: 0
      },
      totalWorkingTime: {
        type: Date,
      },
      active: Boolean,
    },
    {
        timestamps: true,
    }
);

module.exports = {
    Business: mongoose.model('Business', BusinessSchema),
  };