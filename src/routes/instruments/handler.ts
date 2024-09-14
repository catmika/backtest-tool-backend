import { NextFunction, Request, Response } from 'express';

import service from './service';
import { ITestConsecutiveCandlesRequest } from './interface';

const getEarliestTimestamp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const params = {
      symbol: req.query.symbol,
      exchange: req.query.exchange,
      timeframe: req.query.timeframe,
    };

    const data = await service.getEarliestTimestamp(params);

    res.send(data);
  } catch (error) {
    next(error);
  }
};

const testConsecutiveCandles = async (
  req: ITestConsecutiveCandlesRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const params = {
      symbol: req.query.symbol,
      exchange: req.query.exchange,
      timeframe: req.query.timeframe,
      startDate: req.query.startDate,
      endDate: req.query.endDate,
      timezone: req.query.timezone,
      timeFilters: req.query.timeFilters,
      min: +req.query.minConsecutiveCandles,
      max: +req.query.maxConsecutiveCandles,
    };

    const data = await service.testConsecutiveCandles(params);

    res.send(data);
  } catch (error) {
    next(error);
  }
};

const testPreviousKeyLevels = async (
  req: ITestConsecutiveCandlesRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const params = {
      symbol: req.query.symbol,
      exchange: req.query.exchange,
      timeframe: req.query.timeframe,
      startDate: req.query.startDate,
      endDate: req.query.endDate,
      timezone: req.query.timezone,
      timeFilters: req.query.timeFilters,
    };

    const data = await service.testPreviousKeyLevels(params);

    res.send(data);
  } catch (error) {
    next(error);
  }
};

export default {
  getEarliestTimestamp,
  testConsecutiveCandles,
  testPreviousKeyLevels,
};
