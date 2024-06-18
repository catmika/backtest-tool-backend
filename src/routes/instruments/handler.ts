import { NextFunction, Request, Response } from 'express';

import service from './service';
import { ITestConsecutiveCandlesRequest } from './interface';

export const extractExchangeAndSymbol = (symbol: string) => {
  const exchangeAndSymbol = symbol.split(':');

  return {
    symbol:
      exchangeAndSymbol.length === 2
        ? exchangeAndSymbol[1]
        : exchangeAndSymbol[0],
    exchange: exchangeAndSymbol.length === 2 ? exchangeAndSymbol[0] : null,
  };
};

const getEarliestTimestamp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { symbol, exchange } = extractExchangeAndSymbol(
      req.query.symbol as string,
    );

    const params = {
      symbol,
      exchange,
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
    const { symbol, exchange } = extractExchangeAndSymbol(
      req.query.symbol as string,
    );

    const params = {
      symbol,
      exchange,
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

export default {
  getEarliestTimestamp,
  testConsecutiveCandles,
};
