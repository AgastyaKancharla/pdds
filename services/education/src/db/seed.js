require('dotenv').config();
const mongoose = require('mongoose');
const Plant = require('./plant.model');

const SEED_PLANTS = [
  {
    name: 'Tomato',
    scientific_name: 'Solanum lycopersicum',
    category: 'vegetable',
    description: 'One of the most popular home garden vegetables, tomatoes thrive in warm conditions and produce fruit from summer through fall.',
    difficulty: 'moderate',
    climate: ['tropical', 'temperate', 'subtropical'],
    lifecycle_days: 80,
    diseases: ['Early Blight', 'Late Blight', 'Leaf Mold', 'Septoria Leaf Spot', 'Bacterial Spot'],
    tags: ['popular', 'fruit-vegetable', 'warm-season'],
    lifecycle: [
      {
        stage: 'seed',
        duration_days: 7,
        description: 'Germination period. Seeds sprout underground.',
        care: {
          watering: 'Keep soil moist but not waterlogged. Mist lightly twice daily.',
          sunlight: 'Not required until sprout emerges.',
          soil: 'Seed starting mix. pH 6.0–6.8.',
          fertilizer: 'None at this stage.',
          temperature: '21–27°C (70–80°F)',
          humidity: '70–80%',
        },
        tips: ['Sow seeds 6mm deep', 'Use a heat mat for faster germination', 'Cover tray with plastic wrap to retain moisture'],
        common_problems: ['Damping off (overwatering)', 'Slow germination (too cold)'],
      },
      {
        stage: 'sprout',
        duration_days: 14,
        description: 'First true leaves appear. Seedling establishes root system.',
        care: {
          watering: 'Water when top 1cm of soil is dry.',
          sunlight: '14–16 hours under grow lights or sunny south-facing window.',
          soil: 'Continue with seed starting mix.',
          fertilizer: 'Half-strength liquid fertilizer at 2 weeks.',
          temperature: '18–24°C',
          humidity: '60–70%',
        },
        tips: ['Thin to one seedling per cell', 'Introduce airflow with a fan to strengthen stems'],
        common_problems: ['Leggy seedlings (insufficient light)', 'Yellowing (overwatering or nutrient deficiency)'],
      },
      {
        stage: 'vegetative',
        duration_days: 30,
        description: 'Rapid leaf and stem growth. Plant establishes before flowering.',
        care: {
          watering: 'Deep water 2–3x per week. Water at base, not foliage.',
          sunlight: 'Full sun — at least 8 hours daily.',
          soil: 'Well-draining, fertile. Add compost.',
          fertilizer: 'Nitrogen-rich fertilizer (e.g. 10-5-5) every 2 weeks.',
          temperature: '18–29°C',
          humidity: '50–70%',
        },
        tips: ['Stake or cage plants when 30cm tall', 'Prune suckers for indeterminate varieties', 'Mulch to retain moisture and prevent soil splash'],
        common_problems: ['Aphids', 'Early Blight first signs', 'Calcium deficiency'],
      },
      {
        stage: 'flowering',
        duration_days: 21,
        description: 'Yellow flowers appear and fruit begins to set.',
        care: {
          watering: 'Consistent moisture critical — irregular watering causes blossom end rot.',
          sunlight: 'Full sun.',
          soil: 'Maintain even moisture. Top dress with compost.',
          fertilizer: 'Switch to low-nitrogen, high-phosphorus (e.g. 5-10-10).',
          temperature: '18–24°C (cooler nights help fruit set)',
          humidity: '40–60%',
        },
        tips: ['Shake plants gently to aid pollination if indoors', 'Remove excess flowers if plant is stressed', 'Watch for hornworms'],
        common_problems: ['Blossom drop (temperature extremes)', 'Blossom end rot (calcium/watering issue)'],
      },
      {
        stage: 'harvest',
        duration_days: 8,
        description: 'Fruit ripens and is ready for harvest. Color changes from green to red (or variety color).',
        care: {
          watering: 'Reduce watering slightly to intensify flavor.',
          sunlight: 'Full sun.',
          soil: 'No changes needed.',
          fertilizer: 'Stop fertilizing.',
          temperature: '18–27°C',
          humidity: '40–60%',
        },
        tips: ['Harvest when fully colored for best flavor', 'Twist gently to avoid damaging vine', 'Can ripen indoors at room temperature'],
        common_problems: ['Cracking (irregular watering after dry spell)', 'Late Blight at end of season'],
      },
    ],
  },
  {
    name: 'Potato',
    scientific_name: 'Solanum tuberosum',
    category: 'vegetable',
    description: 'A staple crop worldwide, potatoes grow underground and thrive in cool climates.',
    difficulty: 'easy',
    climate: ['temperate', 'cool'],
    lifecycle_days: 90,
    diseases: ['Early Blight', 'Late Blight', 'Black Scurf'],
    tags: ['staple-crop', 'root-vegetable', 'cool-season'],
    lifecycle: [
      { stage: 'seed', duration_days: 14, description: 'Seed potato chitting (sprouting) before planting.', care: { watering: 'Keep seed potatoes in cool dry place. No water yet.', sunlight: 'Indirect light for chitting.', soil: 'Not planted yet.', fertilizer: 'None.', temperature: '10–15°C', humidity: '60–70%' }, tips: ['Chit seed potatoes 2 weeks before planting', 'Choose certified disease-free seed potatoes'], common_problems: ['Rotting seed potatoes (too wet/warm)'] },
      { stage: 'sprout', duration_days: 21, description: 'Shoots emerge from planted seed potatoes.', care: { watering: 'Light, consistent watering.', sunlight: 'Full sun.', soil: 'Loose, well-draining, slightly acidic (pH 5.0–6.0).', fertilizer: 'Balanced starter fertilizer.', temperature: '10–20°C', humidity: '60%' }, tips: ['Plant 10–15cm deep, 30cm apart', 'Hill soil when shoots reach 15cm'], common_problems: ['Frost damage to emerging shoots'] },
      { stage: 'vegetative', duration_days: 30, description: 'Lush foliage growth while tubers begin forming underground.', care: { watering: 'Regular deep watering. 2.5cm per week.', sunlight: 'Full sun.', soil: 'Continue hilling to cover tubers.', fertilizer: 'Low-nitrogen fertilizer after hilling.', temperature: '15–20°C', humidity: '60–80%' }, tips: ['Hill soil twice during this stage', 'Watch for Colorado beetle'], common_problems: ['Early Blight', 'Aphids', 'Colorado Potato Beetle'] },
      { stage: 'flowering', duration_days: 14, description: 'Plants flower. Tubers actively sizing.', care: { watering: 'Consistent moisture — critical for tuber development.', sunlight: 'Full sun.', soil: 'Ensure good drainage.', fertilizer: 'Potassium-rich fertilizer.', temperature: '15–20°C', humidity: '60–70%' }, tips: ['Some varieties don\'t flower — that\'s normal', 'Stop hilling now'], common_problems: ['Late Blight (most critical stage)', 'Irregular tuber sizing'] },
      { stage: 'harvest', duration_days: 11, description: 'Foliage dies back signaling tubers are ready.', care: { watering: 'Stop watering 2 weeks before harvest.', sunlight: 'Doesn\'t matter.', soil: 'Dry soil eases harvest.', fertilizer: 'None.', temperature: 'Any', humidity: 'Low' }, tips: ['Wait until foliage is fully dead', 'Harvest on a dry day', 'Cure potatoes in dark at 10–15°C for 2 weeks before storing'], common_problems: ['Slug damage', 'Green potatoes (exposed to light — toxic, discard)'] },
    ],
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/pdds');
  await Plant.deleteMany({});
  await Plant.insertMany(SEED_PLANTS);
  console.log(`✅ Seeded ${SEED_PLANTS.length} plants`);
  await mongoose.disconnect();
}

seed().catch(console.error);
