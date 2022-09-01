const mongoose = require('mongoose');
const { Schema } = mongoose;

const fields = {
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    // validate: {
    //   validator(value: string) {
    //     return validator.isEmail(value);
    //   },
    //   message: (props: any) => `${props.value} is not a valid email`,
    // },
    // },
  },
  password: { type: String, required: true },
  userType: { type: String, required: true, default: 'user' },
};

const user = new Schema(fields, {
  timestamps: true,
});

module.exports = {
  Model: mongoose.model('user', user),
  fields,
};
