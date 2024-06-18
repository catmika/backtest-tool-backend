import Joi from 'joi';

const getSymbols = Joi.object({
  query: {
    page: Joi.number(),
    limit: Joi.number(),
    sortBy: Joi.string(),
    sortOrder: Joi.string().valid('asc', 'desc'),
    search: Joi.string(),
    market: Joi.string(),
  },
});

export default {
  getSymbols,
};
