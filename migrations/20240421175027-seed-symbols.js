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

    const indicesData = await indicesResponse.json();
    const stocksData = await stocksResponse.json();
    const cryptoData = await cryptoResponse.json();
    const forexData = await forexResponse.json();
    const etfData = await etfResponse.json();

    const indices = indicesData.data.map((s) => {
      return {
        shortName: s.symbol,
        fullName: s.name,
        exchanges: [s.exchange],
        market: 'indices',
      };
    });
    const stocks = await stocksData.data.map((s) => {
      return {
        shortName: s.symbol,
        fullName: s.name,
        exchanges: [s.exchange],
        market: 'stocks',
      };
    });
    const crypto = await cryptoData.data.map((s) => {
      return {
        shortName: s.symbol,
        fullName: s.currency_base,
        exchanges: s.available_exchanges,
        market: 'cryptocurrencies',
      };
    });
    const forex = await forexData.data.map((s) => {
      return {
        shortName: s.symbol,
        fullName: s.currency_base,
        market: 'forex_pairs',
      };
    });
    const etf = await etfData.data.map((s) => {
      return {
        shortName: s.symbol,
        fullName: s.name,
        exchanges: [s.exchange],
        market: 'etf',
      };
    });
    const allSymbols = [...indices, ...stocks, ...crypto, ...forex, ...etf];
    await db.collection('Symbol').insertMany(allSymbols);
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
    await db.collection('Symbol').deleteMany({});
  },
};
