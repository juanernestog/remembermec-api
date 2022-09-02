const mongoose = require('mongoose');
const { Schema } = mongoose;

const fields = {
  reference: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: Number, required: true, min: 1900, max: 2100 },
  description: { type: String, required: false },
  numberPlate: { type: String, required: false },
  aquisitionDate: { type: Date, required: false },
  //  Maintenance: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Maintenance' }],
};

const refereces = {
  userId: { type: mongoose.ObjectId, ref: 'user', required: true },
};

const machine = new Schema(Object.assign(fields, refereces), {
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
});

const virtuals = {
  maintenances: {
    ref: 'maintenance',
    localField: '_id',
    foreignField: 'machineId',
  },
  maintenancesCount: {
    ref: 'maintenance',
    localField: '_id',
    foreignField: 'machineId',
    count: true,
  },
};

machine.virtual('maintenances', virtuals.maintenances);
machine.virtual('maintenancesCount', virtuals.maintenancesCount);

module.exports = {
  Model: mongoose.model('machine', machine),
  fields,
  refereces,
};
