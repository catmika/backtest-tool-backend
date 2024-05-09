module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});

    const apikey = process.env.TWELVE_DATA_API_KEY;

    const config = {
      method: 'GET',
      params: {
        apikey,
      },
    };

    const baseUrl = 'https://api.twelvedata.com';

    const indicesResponse = await fetch(`${baseUrl}/indices`, config);
    const stocksResponse = await fetch(`${baseUrl}/stocks`, config);
    const cryptoResponse = await fetch(`${baseUrl}/cryptocurrencies`, config);
    const forexResponse = await fetch(`${baseUrl}/forex_pairs`, config);
    const etfResponse = await fetch(`${baseUrl}/etf`, config);

    console.log(indicesResponse);

    const indicesResponseJson = await indicesResponse.json();
    const stocksResponseJson = await stocksResponse.json();
    const cryptoResponseJson = await cryptoResponse.json();
    const forexResponseJson = await forexResponse.json();
    const etfResponseJson = await etfResponse.json();

    console.log(indicesResponseJson);

    const stocks = await stocksResponseJson.data.map((symbol) => {
      const exchangeAndNameArr = symbol.s.split(':');
      return {
        shortName: exchangeAndNameArr[1],
        fullName: symbol.name,
        exchange: symbol.exchange,
        market: 'stocks',
      };
    });
    // const crypto = await cryptoResponseJson.data.map((symbol) => {
    //   const exchangeAndNameArr = symbol.s.split(':');
    //   return {
    //     shortName: exchangeAndNameArr[1],
    //     fullName: symbol.d[0],
    //     exchange: exchangeAndNameArr[0],
    //     market: 'crypto',
    //   };
    // });
    // const forex = await forexResponseJson.data.map((symbol) => {
    //   const exchangeAndNameArr = symbol.s.split(':');
    //   return {
    //     shortName: exchangeAndNameArr[1],
    //     fullName: symbol.d[0],
    //     exchange: exchangeAndNameArr[0],
    //     market: 'forex',
    //   };
    // });
    // const futures = await futuresResponseJson.data.map((symbol) => {
    //   const exchangeAndNameArr = symbol.s.split(':');
    //   return {
    //     shortName: exchangeAndNameArr[1],
    //     fullName: symbol.d[0],
    //     exchange: exchangeAndNameArr[0],
    //     market: 'futures',
    //   };
    // });
    // const bonds = await bondsResponseJson.data.map((symbol) => {
    //   const exchangeAndNameArr = symbol.s.split(':');
    //   return {
    //     shortName: exchangeAndNameArr[1],
    //     fullName: symbol.d[0],
    //     exchange: exchangeAndNameArr[0],
    //     market: 'bonds',
    //   };
    // });
    // const indices = indicesArr.map((s) => {
    //   const exchangeAndNameArr = s.symbol.split(':');
    //   return {
    //     shortName: exchangeAndNameArr[1],
    //     fullName: s.fullname,
    //     exchange: exchangeAndNameArr[0],
    //     market: 'indices',
    //   };
    // });

    // const allSymbols = [
    //   ...stocks,
    //   ...crypto,
    //   ...forex,
    //   ...futures,
    //   ...bonds,
    //   ...indices,
    // ];

    // await db.collection('Symbol').insertMany(allSymbols);
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});

    await db.collection('Symbol').deleteMany({});
  },
};
