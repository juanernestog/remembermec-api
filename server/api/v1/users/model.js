const mongoose = require('mongoose');
const { Schema } = mongoose;
const { hash, compare } = require('bcryptjs');

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

const hiddenFields = ['password'];

const user = new Schema(fields, {
  timestamps: true,
});

user.methods.toJSON = function () {
  const doc = this.toObject();

  hiddenFields.forEach((field) => {
    delete doc[field];
  });

  return doc;
};

user.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    this.password = await hash(this.password, 10);
  }
  next();
});

user.methods.verifyPassword = function (input) {
  return compare(input, this.password);
};

module.exports = {
  Model: mongoose.model('user', user),
  fields,
};
