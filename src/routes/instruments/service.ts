import moment from 'moment';
import { ICandle } from './interface';
import { ErrorHandler } from '../../util/errorHandler';

const apiKey = process.env.TWELVE_DATA_API_KEY;
const apiBaseUrl = process.env.TWELVE_DATA_BASE_URL;

const applyTimeFilters = (candles: ICandle[], timeFilters: string[]) => {
  const isCandlesHaveTime = candles.every(
    (candle) => candle.datetime.split(' ').length > 1,
  );

  if (isCandlesHaveTime && timeFilters[0]) {
    return candles.filter((candle) => {
      const candleTime = moment(candle.datetime).format('HH:mm');
      return timeFilters.every((filter) => {
        const [start, end] = filter.split('-');
        const candleMoment = moment(candleTime, 'HH:mm');
        const startMoment = moment(start, 'HH:mm');
        const endMoment = moment(end, 'HH:mm');

        return (
          (candleMoment.isBefore(startMoment, 'minute') &&
            candleMoment.isAfter(endMoment, 'minute')) ||
          (candleMoment.isAfter(startMoment, 'minute') &&
            candleMoment.isAfter(endMoment, 'minute'))
        );
      });
    });
  }
  return candles;
};

const getEarliestTimestamp = async ({ symbol, exchange, timeframe }) => {
  const response = await fetch(
    `${apiBaseUrl}/earliest_timestamp?symbol=${symbol}${
      exchange ? `&exchange=${exchange}` : ''
    }&interval=${timeframe}&apikey=${apiKey}`,
  );

  if (!response.ok) {
    console.error(response);
    throw new ErrorHandler('Data provider error', 500);
    //or response.status?
  }

  const { datetime } = await response.json();

  return { datetime };
};

const testConsecutiveCandles = async ({
  symbol,
  exchange,
  timeframe,
  startDate,
  endDate,
  timezone,
  timeFilters,
  min,
  max,
}) => {
  const response = await fetch(
    `${apiBaseUrl}/time_series?symbol=${symbol}&interval=${timeframe}${
      exchange ? `&exchange=${exchange}` : ''
    }&start_date=${startDate}&end_date=${endDate}&timezone=${timezone}&apikey=${apiKey}`,
  );

  if (!response.ok) {
    console.error(response);
    throw new ErrorHandler('Data provider error', 500);
    //or response.status?
  }

  const chartData = await response.json();

  if (chartData?.status === 'error') {
    console.error(chartData);
    throw new ErrorHandler(chartData?.message, chartData?.code);
  }

  const candles = applyTimeFilters(chartData.values, timeFilters.split(','));

  const bullishSeries = new Array(max - min + 1).fill(0);
  const bearishSeries = new Array(max - min + 1).fill(0);

  let bullishCounter = 0;
  let bearishCounter = 0;

  for (const candle of candles) {
    const isBullish = +candle.open < +candle.close;
    const isBearish = +candle.open > +candle.close;

    if (isBullish) {
      bullishCounter++;
      bearishCounter = 0;
    }
    if (isBearish) {
      bearishCounter++;
      bullishCounter = 0;
    }

    if (bullishCounter >= min && bullishCounter <= max) {
      bullishSeries[bullishCounter - min]++;
    }
    if (bearishCounter >= min && bearishCounter <= max) {
      bearishSeries[bearishCounter - min]++;
    }
  }

  const overallSeries = bullishSeries.map(
    (value, index) => value + bearishSeries[index],
  );

  const calculateStatistics = (series) => {
    return series.map((amount, consecutive) => ({
      [consecutive + min]: {
        amount,
        percentage: Math.round((amount / candles.length) * 100),
      },
    }));
  };

  const bullishStat = calculateStatistics(bullishSeries);
  const bearishStat = calculateStatistics(bearishSeries);
  const overallStat = calculateStatistics(overallSeries);

  const statistics = {
    bullish: Object.assign({}, ...bullishStat),
    bearish: Object.assign({}, ...bearishStat),
    overall: Object.assign({}, ...overallStat),
  };

  return statistics;
};

export default { getEarliestTimestamp, testConsecutiveCandles };
