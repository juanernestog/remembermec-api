const mongoose = require('mongoose');
const { Schema } = mongoose;

const fields = {
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  location: { type: String, required: false, trim: true },
  date: { type: Date, required: true },
  isPeriodic: { type: Boolean, required: true, default: false },
  period: { type: Number, required: false },
  periodUnit: {
    type: String,
    required: false /*  , ['km', 'mi', 'h', 'months', 'years']*/,
  },
};

const refereces = {
  userId: { type: mongoose.ObjectId, ref: 'user', required: true },
  machineId: { type: mongoose.ObjectId, ref: 'machine', required: true },
};

const maintenance = new Schema(Object.assign(fields, refereces), {
  timestamps: true,
});

module.exports = {
  Model: mongoose.model('maintenance', maintenance),
  fields,
  refereces,
};
