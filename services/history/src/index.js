require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const winston = require('winston');

const historyRoutes = require('./routes/history');
const healthRoutes = require('./routes/health');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [new winston.transports.Console()],
});

const app = express();
const PORT = process.env.PORT || 3003;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

app.use('/health', healthRoutes);
app.use('/history', historyRoutes);

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/pdds')
  .then(() => logger.info('History service: MongoDB connected'))
  .catch((err) => logger.error(`MongoDB error: ${err.message}`));

app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(500).json({ success: false, error: 'Internal server error' });
});

app.listen(PORT, () => logger.info(`📋 History service running on port ${PORT}`));
module.exports = app;
