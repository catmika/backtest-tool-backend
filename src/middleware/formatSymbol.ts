import { NextFunction, Request, Response } from 'express';

const formatSymbol = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (typeof req.query.symbol === 'string') {
    const exchangeAndSymbol = req.query.symbol.split(':');

    req.query.symbol =
      exchangeAndSymbol.length === 2
        ? exchangeAndSymbol[1]
        : exchangeAndSymbol[0];

    req.query.exchange =
      exchangeAndSymbol.length === 2 ? exchangeAndSymbol[0] : null;
  }
  next();
};

export default formatSymbol;
