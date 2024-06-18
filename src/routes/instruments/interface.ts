import { Request } from 'express';
import { TIMEFRAMES, TIMEZONES } from '../../util/constants';

export interface ICandle {
  datetime: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}

export type TTimeframe = (typeof TIMEFRAMES)[keyof typeof TIMEFRAMES];

export type TTimezone = (typeof TIMEZONES)[keyof typeof TIMEZONES];

export interface IInstrumentRequest extends Request {
  query: {
    symbol: string;
    timeframe: TTimeframe;
    startDate: string;
    endDate: string;
    timezone: TTimezone;
    timeFilters: string;
  };
}

export interface ITestConsecutiveCandlesRequest extends IInstrumentRequest {
  query: IInstrumentRequest['query'] & {
    minConsecutiveCandles: string;
    maxConsecutiveCandles: string;
  };
}
