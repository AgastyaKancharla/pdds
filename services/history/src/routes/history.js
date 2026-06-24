const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Helper — use shared detections collection
const getCollection = () => mongoose.connection.collection('detections');

// GET /history — user's full detection history
router.get('/', async (req, res) => {
  try {
    const userId = req.headers['x-user-id'];
    if (!userId) return res.status(401).json({ success: false, error: 'Unauthorized' });

    const { page = 1, limit = 20, severity, plant } = req.query;
    const match = { user_id: userId };
    if (severity) match['result.severity'] = severity;
    if (plant) match['result.plant'] = { $regex: plant, $options: 'i' };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const col = getCollection();

    const [detections, total] = await Promise.all([
      col.find(match, {
        projection: {
          _id: 1,
          'result.plant': 1,
          'result.disease': 1,
          'result.confidence': 1,
          'result.severity': 1,
          'result.is_healthy': 1,
          images: { $slice: 1 },
          created_at: 1,
        }
      }).sort({ created_at: -1 }).skip(skip).limit(parseInt(limit)).toArray(),
      col.countDocuments(match),
    ]);

    res.json({
      success: true,
      data: {
        detections,
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /history/stats — summary stats for user dashboard
router.get('/stats', async (req, res) => {
  try {
    const userId = req.headers['x-user-id'];
    if (!userId) return res.status(401).json({ success: false, error: 'Unauthorized' });

    const col = getCollection();
    const [total, healthy, critical, recent] = await Promise.all([
      col.countDocuments({ user_id: userId }),
      col.countDocuments({ user_id: userId, 'result.is_healthy': true }),
      col.countDocuments({ user_id: userId, 'result.severity': 'critical' }),
      col.find({ user_id: userId }, { projection: { 'result.disease': 1, created_at: 1 } })
        .sort({ created_at: -1 }).limit(5).toArray(),
    ]);

    // Most frequent disease
    const diseaseAgg = await col.aggregate([
      { $match: { user_id: userId, 'result.is_healthy': false } },
      { $group: { _id: '$result.disease', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 3 },
    ]).toArray();

    res.json({
      success: true,
      data: {
        total_detections: total,
        healthy_count: healthy,
        diseased_count: total - healthy,
        critical_count: critical,
        top_diseases: diseaseAgg,
        recent_detections: recent,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /history/:id — single detection full detail
router.get('/:id', async (req, res) => {
  try {
    const userId = req.headers['x-user-id'];
    const col = getCollection();
    const doc = await col.findOne({ _id: req.params.id, user_id: userId });
    if (!doc) return res.status(404).json({ success: false, error: 'Detection not found' });
    res.json({ success: true, data: doc });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /history/:id — delete a detection
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.headers['x-user-id'];
    const col = getCollection();
    const result = await col.deleteOne({ _id: req.params.id, user_id: userId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, error: 'Detection not found' });
    }
    res.json({ success: true, message: 'Detection deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
