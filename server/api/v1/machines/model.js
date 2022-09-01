const mongoose = require('mongoose');
const { Schema } = mongoose;

const fields = {
  reference: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: Number, required: true, min: 1900, max: 2100 },
  description: { type: String, required: false },
  numberPlate: { type: String, required: false },
  aquisitionDate: { type: Date, required: false },
  Maintenance: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Maintenance' }],
};

const machine = new Schema(fields, {
  timestamps: true,
});

module.exports = {
  Model: mongoose.model('machine', machine),
  fields,
};
