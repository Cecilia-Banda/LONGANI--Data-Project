const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  patientId: { type: String, required: true, unique: true },
  age: { type: Number },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  address: { type: String },
  phone: { type: String },
  diagnosis: { type: String },
  admissionDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Patient', PatientSchema);