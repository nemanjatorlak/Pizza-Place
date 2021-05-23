const mongoose = require('mongoose');
const { Schema } = mongoose;
const roles = ['Admin', 'User'];

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      minlength: [1, 'Please enter your name!'],
      maxlength: [30, 'Name must be max 30 characters long!']
    },
    lastName: {
      type: String,
      trim: true,
      minlength: [1, 'Please enter your surname!'],
      maxlength: [30, 'Surname must be max 30 characters long!']
    },
    address: {
      type: String,
      trim: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    username: {
        type: String,
        trim: true,
        unique: [true, 'This username already exists!'],
        minlength: [2, 'Username must be min 2 characters long!'],
        maxlength: [15, 'Username must be max 15 characters long!']
    },
    password: {
      type: String,
      required: [true, 'Please enter your password!'],
      minlength: [5, 'Password must be min 5 characters long!'],
      select: false,
    },
    role: {
      type: String,
      enums: roles,
    },
  },
);

module.exports = {
  User: mongoose.model('User', UserSchema),
};
