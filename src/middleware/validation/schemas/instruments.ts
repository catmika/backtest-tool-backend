import Joi from 'joi';

const timeRangeRegex =
  /^([01]?[0-9]|2[0-3]):[0-5][0-9]-([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

const getEarliestTimestamp = Joi.object({
  query: {
    symbol: Joi.string().required(),
    timeframe: Joi.string().required(),
  },
});

const testConsecutiveCandles = Joi.object({
  query: {
    symbol: Joi.string().required(),
    timeframe: Joi.string().required(),
    startDate: Joi.string()
      .pattern(/^\d{4}-\d{2}-\d{2}$/)
      .required(),
    endDate: Joi.string()
      .pattern(/^\d{4}-\d{2}-\d{2}$/)
      .required(),
    timezone: Joi.string().required(),
    timeFilters: Joi.array()
      .optional()
      .max(10)
      .items(
        Joi.string().pattern(timeRangeRegex).required(),
        Joi.string().pattern(timeRangeRegex).required(),
      ),
    min: Joi.string()
      .regex(/^([1-9]|10)$/)
      .required(),
    max: Joi.string()
      .regex(/^([1-9]|10)$/)
      .required(),
  },
});

export default {
  getEarliestTimestamp,
  testConsecutiveCandles,
};
