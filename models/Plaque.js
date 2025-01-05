import mongoose from 'mongoose';

const PlaqueSchema = new mongoose.Schema({
  numero: { type: String, required: true },
  country: { type: String, required: true },
  canton: { type: String },
  reports: { type: Number, default: 1 },
  denounced: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }, // Timestamp de création
  editedAt: { type: Date }, // Timestamp de modification
});

export default mongoose.models.Plaque || mongoose.model('Plaque', PlaqueSchema);