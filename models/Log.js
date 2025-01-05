import mongoose from 'mongoose';

const LogSchema = new mongoose.Schema({
  action: { type: String, required: true }, // Type d'action : POST, DELETE, PATCH
  endpoint: { type: String }, // Endpoint API appelé
  method: { type: String }, // Méthode HTTP
  ip: { type: String }, // Adresse IP du client
  date: { type: Date, default: Date.now }, // Timestamp
  payload: { type: mongoose.Schema.Types.Mixed }, // Données envoyées (facultatif)
});

export default mongoose.models.Log || mongoose.model('Log', LogSchema);