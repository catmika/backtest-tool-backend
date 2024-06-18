module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
    const baseUrl = 'https://api.twelvedata.com';

    const indicesResponse = await fetch(`${baseUrl}/indices?show_plan=true`);
    const stocksResponse = await fetch(`${baseUrl}/stocks?show_plan=true`);
    const cryptoResponse = await fetch(
      `${baseUrl}/cryptocurrencies?show_plan=true`,
    );
    const forexResponse = await fetch(`${baseUrl}/forex_pairs?show_plan=true`);
    const etfResponse = await fetch(`${baseUrl}/etf?show_plan=true`);
    const fundsResponse = await fetch(`${baseUrl}/funds?show_plan=true`);
    const bondsResponse = await fetch(`${baseUrl}/bonds?show_plan=true`);

    const indicesData = await indicesResponse.json();
    const stocksData = await stocksResponse.json();
    const cryptoData = await cryptoResponse.json();
    const forexData = await forexResponse.json();
    const etfData = await etfResponse.json();
    const fundsData = await fundsResponse.json();
    const bondsData = await bondsResponse.json();

    const indices = indicesData.data
      .filter((symbol) => symbol.access.plan === 'Basic')
      .map((s) => {
        return {
          shortName: s.symbol,
          fullName: s.name,
          exchanges: [s.exchange],
          market: 'indices',
        };
      });
    const stocks = await stocksData.data
      .filter((symbol) => symbol.access.plan === 'Basic')
      .map((s) => {
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
    const etf = await etfData.data
      .filter((symbol) => symbol.access.plan === 'Basic')
      .map((s) => {
        return {
          shortName: s.symbol,
          fullName: s.name,
          exchanges: [s.exchange],
          market: 'etf',
        };
      });
    const funds = await fundsData.result.list
      .filter((symbol) => symbol.access.plan === 'Basic')
      .map((s) => {
        return {
          shortName: s.symbol,
          fullName: s.name,
          exchanges: [s.exchange],
          market: 'funds',
        };
      });
    const bonds = await bondsData.result.list
      .filter((symbol) => symbol.access.plan === 'Basic')
      .map((s) => {
        return {
          shortName: s.symbol,
          fullName: s.name,
          exchanges: [s.exchange],
          market: 'bonds',
        };
      });

    const allSymbols = [
      ...indices,
      ...stocks,
      ...crypto,
      ...forex,
      ...etf,
      ...funds,
      ...bonds,
    ];
    await db.collection('Symbol').insertMany(allSymbols);
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
    await db.collection('Symbol').deleteMany({});
  },
};
