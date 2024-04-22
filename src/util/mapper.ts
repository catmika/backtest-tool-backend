import { ISymbolDocument } from '../models/Symbol.model';

export const mapSymbol = (i: ISymbolDocument) => {
  if (!i) {
    return null;
  }

  const { _id, shortName, fullName, market, exchange } = i;

  return {
    id: _id,
    shortName,
    fullName,
    market,
    exchange,
  };
};
