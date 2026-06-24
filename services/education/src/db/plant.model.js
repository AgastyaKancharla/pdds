const mongoose = require('mongoose');

const lifecycleStageSchema = new mongoose.Schema({
  stage: { type: String, required: true },       // 'seed', 'sprout', 'vegetative', 'flowering', 'harvest'
  duration_days: { type: Number },
  description: { type: String },
  care: {
    watering: String,
    sunlight: String,
    soil: String,
    fertilizer: String,
    temperature: String,
    humidity: String,
  },
  common_problems: [String],
  tips: [String],
  image_url: String,
});

const plantSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  scientific_name: String,
  category: { type: String, enum: ['vegetable', 'fruit', 'grain', 'herb', 'flower', 'tree'] },
  description: String,
  difficulty: { type: String, enum: ['easy', 'moderate', 'hard'] },
  climate: [String],
  lifecycle_days: Number,
  lifecycle: [lifecycleStageSchema],
  diseases: [{ type: String }],             // disease names this plant is susceptible to
  image_url: String,
  thumbnail_url: String,
  tags: [String],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

plantSchema.pre('save', function (next) {
  this.updated_at = new Date();
  next();
});

module.exports = mongoose.model('Plant', plantSchema);
