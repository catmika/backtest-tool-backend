import { PipelineStage } from 'mongoose';
import Symbol from '../../models/Symbol.model';
import { IPaginationObject } from './interface';
import { mapSymbol } from '../../util/mapper';

const TradingView = require('@mathieuc/tradingview');

/**
 * This example tests fetching chart data of a number
 * of candles before or after a timestamp
 */

const client = new TradingView.Client();

const chart = new client.Session.Chart();
chart.setMarket('OANDA:EURUSD', {
  timeframe: 'D',
  range: 1, // Can be positive to get before or negative to get after
  to: 1675358389,
});

// This works with indicators

// TradingView.getIndicator('STD;Supertrend').then(async (indic) => {
//   console.log(`Loading '${indic.description}' study...`);
//   const SUPERTREND = new chart.Study(indic);

//   SUPERTREND.onUpdate(() => {
//     console.log('Prices periods:', chart.periods);
//     console.log('Study periods:', SUPERTREND.periods);
//     client.end();
//   });
// });

chart.onSymbolLoaded(() => {
  console.log(chart.periods);
});

chart.onUpdate(() => {
  console.log('OK', chart.periods);
  client.end();
});

const getSymbols = async (params: IPaginationObject) => {
  const pipelines: PipelineStage[] = [];

  if (!params.page || !params.limit) {
    const symbol = await Symbol.aggregate([...pipelines]);
    return symbol.map(mapSymbol);
  }

  const offset = (+params.page - 1) * +params.limit;

  if (params.sortBy && params.sortOrder) {
    pipelines.push({
      $sort: { [params.sortBy]: params.sortOrder === 'asc' ? 1 : -1 },
    });
  }

  if (params.search) {
    const regex = new RegExp(params.search, 'i');
    pipelines.push({
      $match: {
        $or: [{ name: regex }, { market: regex }, { exchange: regex }],
      },
    });
  }

  const results = await Symbol.aggregate(
    [
      // ...pipelines,
      {
        $facet: {
          paginatedResults: [{ $skip: offset }, { $limit: +params.limit }],
          totalCount: [
            {
              $count: 'count',
            },
          ],
        },
      },
    ],
    {
      collation: {
        locale: 'en',
        numericOrdering: true,
      },
    },
  );

  const symbol = results[0].paginatedResults;

  return {
    data: symbol.map(mapSymbol),
    totalCount: results?.[0]?.totalCount?.[0]?.count || 0,
  };
};

export default { getSymbols };
