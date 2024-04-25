import { NextFunction, Request, Response } from 'express';

import service from './service';
import { IPagination } from './interface';

const getSymbols = async (
  req: IPagination,
  res: Response,
  next: NextFunction,
) => {
  try {
    const params = {
      page: parseInt(req.query.page),
      limit: parseInt(req.query.limit),
      sortBy: req.query.sortBy,
      sortOrder: req.query.sortOrder,
      search: req.query.search,
      market: req.query.market,
    };

    const data = await service.getSymbols(params);
    res.send(data);
  } catch (error) {
    next(error);
  }
};

export default {
  getSymbols,
};
