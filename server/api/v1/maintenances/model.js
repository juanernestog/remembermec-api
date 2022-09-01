const mongoose = require('mongoose');
const { Schema } = mongoose;

const fields = {
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: false },
  date: { type: Date, required: true },
  isPeriodic: { type: Boolean, required: true, default: false },
  period: { type: Number, required: false },
  periodUnit: { type: String, required: false /*  , ['km', 'mi', 'h']*/ },
};

const maintenance = new Schema(fields, {
  timestamps: true,
});

module.exports = {
  Model: mongoose.model('maintenance', maintenance),
  fields,
};
