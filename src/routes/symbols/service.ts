import { PipelineStage } from 'mongoose';
import Symbol from '../../models/Symbol.model';
import { IPaginationObject } from './interface';
import { mapSymbol } from '../../util/mapper';

const getSymbols = async (params: IPaginationObject) => {
  const pipelines: PipelineStage[] = [];

  if (params.sortBy && params.sortOrder) {
    pipelines.push({
      $sort: { [params.sortBy]: params.sortOrder === 'asc' ? 1 : -1 },
    });
  }

  if (params.search) {
    const regex = new RegExp(params.search, 'i');
    pipelines.push({
      $match: {
        $or: [
          { shortName: regex },
          { fullName: regex },
          { market: regex },
          { exchange: regex },
        ],
      },
    });
  }

  if (params.market) {
    pipelines.push({
      $match: {
        market: params.market,
      },
    });
  }

  if (!params.page || !params.limit) {
    const symbol = await Symbol.aggregate([...pipelines]);
    return symbol.map(mapSymbol);
  }

  const offset = (+params.page - 1) * +params.limit;

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
