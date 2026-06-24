const express = require('express');
const Plant = require('../db/plant.model');
const router = express.Router();

// GET /education/plants — list all plants with optional search & filter
router.get('/', async (req, res) => {
  try {
    const { search, category, difficulty, page = 1, limit = 20 } = req.query;
    const query = {};
    if (search) query.name = { $regex: search, $options: 'i' };
    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [plants, total] = await Promise.all([
      Plant.find(query)
        .select('name scientific_name category difficulty description thumbnail_url tags lifecycle_days')
        .skip(skip)
        .limit(parseInt(limit))
        .sort({ name: 1 }),
      Plant.countDocuments(query),
    ]);

    res.json({
      success: true,
      data: { plants, total, page: parseInt(page), pages: Math.ceil(total / parseInt(limit)) },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /education/plants/:name — full plant detail with lifecycle
router.get('/:name', async (req, res) => {
  try {
    const plant = await Plant.findOne({
      name: { $regex: `^${req.params.name}$`, $options: 'i' },
    });
    if (!plant) return res.status(404).json({ success: false, error: 'Plant not found' });
    res.json({ success: true, data: plant });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /education/plants/:name/lifecycle — just lifecycle stages
router.get('/:name/lifecycle', async (req, res) => {
  try {
    const plant = await Plant.findOne(
      { name: { $regex: `^${req.params.name}$`, $options: 'i' } },
      'name lifecycle lifecycle_days'
    );
    if (!plant) return res.status(404).json({ success: false, error: 'Plant not found' });
    res.json({ success: true, data: { name: plant.name, lifecycle: plant.lifecycle, total_days: plant.lifecycle_days } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
