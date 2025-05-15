const mongoose = require('mongoose');

const serviceRequestSchema = new mongoose.Schema({
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  scheduledDate: Date,
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  handyman: { type: mongoose.Schema.Types.ObjectId, ref: 'Handyman' }, // peut être vide au début
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ServiceRequest', serviceRequestSchema);
