module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});

    const indicesArr = [
      {
        symbol: 'SP:SPX',
        fullname: 'S&P 500',
      },
      {
        symbol: 'TVC:IXIC',
        fullname: 'US Composite Index',
      },
      {
        symbol: 'DJ:DJI',
        fullname: 'Dow Jones Industrial Average Index',
      },
      {
        symbol: 'CBOE:VIX',
        fullname: 'CBOE Volatility Index',
      },
      {
        symbol: 'TSX:TSX',
        fullname: 'S&P/TSX Composite index',
      },
      {
        symbol: 'TVC:UKX',
        fullname: 'UK 100 INDEX',
      },
      {
        symbol: 'XETR:DAX',
        fullname: 'DAX Index',
      },
      {
        symbol: 'EURONEXT:PX1',
        fullname: 'CAC 40 Index',
      },
      {
        symbol: 'TVC:FTMIB',
        fullname: 'MILANO ITALIA BORSA INDEX',
      },
      {
        symbol: 'TVC:NI225',
        fullname: 'Nikkei 225 Index',
      },
      {
        symbol: 'TVC:KOSPI',
        fullname: 'KOREA COMPOSITE STOCK PRICE INDEX (KOSPI)',
      },
      {
        symbol: 'SSE:000001',
        fullname: 'SSE Composite Index',
      },
      {
        symbol: 'SZSE:399001',
        fullname: 'Shenzhen Component Index',
      },
      {
        symbol: 'HSI:HSI',
        fullname: 'Hang Seng Index',
      },
      {
        symbol: 'TVC:STI',
        fullname: 'STRAITS TIMES INDEX',
      },
      {
        symbol: 'ASX:XJO',
        fullname: 'S&P/ASX 200 Index',
      },
      {
        symbol: 'NZX:NZ50G',
        fullname: 'S&P/NZX 50 Gross Index',
      },
      {
        symbol: 'TWSE:TAIEX',
        fullname: 'TWSE Capitalization Weighted Stock Index',
      },
      {
        symbol: 'FTSEMYX:FBMKLCI',
        fullname: 'FTSE Bursa Malaysia KLCI Index',
      },
      {
        symbol: 'IDX:COMPOSITE',
        fullname: 'IDX Composite Index',
      },
      {
        symbol: 'TVC:SX5E',
        fullname: 'STOXX 50',
      },
      {
        symbol: 'BME:IBC',
        fullname: 'IBEX 35 Index',
      },
      {
        symbol: 'SIX:SMI',
        fullname: 'Swiss Market Index',
      },
      {
        symbol: 'GPW:WIG20',
        fullname: 'WIG20 Index',
      },
      {
        symbol: 'EURONEXT:AEX',
        fullname: 'AEX-Index',
      },
      {
        symbol: 'EURONEXT:BEL20',
        fullname: 'BEL 20 Index',
      },
      {
        symbol: 'MOEX:IMOEX',
        fullname: 'MOEX Russia Index',
      },
      {
        symbol: 'OMXHEX:OMXH25',
        fullname: 'OMX Helsinki 25 Index',
      },
      {
        symbol: 'OMXSTO:OMXS30',
        fullname: 'OMX Stockholm 30 Index',
      },
      {
        symbol: 'OMXCOP:OMXC25',
        fullname: 'OMX Copenhagen 25 Index',
      },
      {
        symbol: 'BELEX:BELEX15',
        fullname: 'BELEX 15 Index',
      },
      {
        symbol: 'OMXRSE:OMXRGI',
        fullname: 'OMX Riga Gross Index',
      },
      {
        symbol: 'OMXTSE:OMXTGI',
        fullname: 'OMX Tallinn Gross Index',
      },
      {
        symbol: 'OMXVSE:OMXVGI',
        fullname: 'OMX Vilnius Gross Index',
      },
      {
        symbol: 'BIST:XU100',
        fullname: 'BIST 100 Index',
      },
      {
        symbol: 'TASE:TA35',
        fullname: 'TA-35 Index',
      },
      {
        symbol: 'TVC:SA40',
        fullname: 'SOUTH AFRICA TOP 40 INDEX',
      },
      {
        symbol: 'NSE:NIFTY',
        fullname: 'Nifty 50 Index',
      },
      {
        symbol: 'BSE:SENSEX',
        fullname: 'S&P BSE SENSEX Index',
      },
      {
        symbol: 'DFM:DFMGI',
        fullname: 'DFM General Index',
      },
      {
        symbol: 'TADAWUL:TASI',
        fullname: 'Tadawul All Shares Index',
      },
      {
        symbol: 'QSE:GNRI',
        fullname: 'QE Index',
      },
      {
        symbol: 'BAHRAIN:BHBX',
        fullname: 'Bahrain All Share Index',
      },
      {
        symbol: 'EGX:EGX30',
        fullname: 'EGX 30 Index',
      },
      {
        symbol: 'BMFBOVESPA:IBOV',
        fullname: 'Bovespa Index',
      },
      {
        symbol: 'BMV:ME',
        fullname: 'S&P/BMV IPC Index',
      },
      {
        symbol: 'BCBA:IMV',
        fullname: 'S&P MERVAL Index',
      },
      {
        symbol: 'BVC:ICAP',
        fullname: 'MSCI COLCAP Index',
      },
      {
        symbol: 'BCS:SP_IPSA',
        fullname: 'S&P IPSA Index',
      },
      {
        symbol: 'BVL:SPBLPGPT',
        fullname: 'S&P/BVL Peru General Index TR (PEN)',
      },
      {
        symbol: 'BET:BUX',
        fullname: 'Budapest Stock Exchange Index',
      },
      {
        symbol: 'ATHEX:GD',
        fullname: 'ATHEX Composite Index',
      },
      {
        symbol: 'BVB:BET',
        fullname: 'Bucharest Exchange Trading Index',
      },
      {
        symbol: 'IDX:IDX30',
        fullname: 'IDX 30 Index',
      },
      {
        symbol: 'TVC:VIX',
        fullname: 'VOLATILITY S&P 500',
      },
      {
        symbol: 'TVC:SXXP',
        fullname: 'STOXX 600',
      },
      {
        symbol: 'TVC:CAC40',
        fullname: 'CAC 40',
      },
      {
        symbol: 'TVC:NYA',
        fullname: 'NYSE Composite Index',
      },
      {
        symbol: 'TVC:XAX',
        fullname: 'NYSE American Composite Index',
      },
      {
        symbol: 'OANDA:DE30EUR',
        fullname: 'Germany 30',
      },
      {
        symbol: 'OANDA:NL25EUR',
        fullname: 'Netherlands 25',
      },
      {
        symbol: 'TVC:MOVE',
        fullname:
          'ICE BofAML U.S. Bond Market Option Volatility Estimate Index',
      },
      {
        symbol: 'TVC:XMI',
        fullname: 'NYSE Arca Major Market Index',
      },
      {
        symbol: 'TVC:HGX',
        fullname: 'PHLX Housing Sector',
      },
      {
        symbol: 'TVC:HSI',
        fullname: 'Hang Seng Index',
      },
      {
        symbol: 'OANDA:US30USD',
        fullname: 'US Wall St 30',
      },
      {
        symbol: 'TVC:SOX',
        fullname: 'PHLX Semiconductor',
      },
      {
        symbol: 'TVC:DJI',
        fullname: 'Dow Jones Industrial Average Index',
      },
      {
        symbol: 'TVC:RUT',
        fullname: 'US Small Cap 2000 Index',
      },
      {
        symbol: 'TVC:RUI',
        fullname: 'US Small Cap 1000 Index',
      },
      {
        symbol: 'TVC:RUA',
        fullname: 'US Small Cap 3000 Index',
      },
      {
        symbol: 'TVC:SSMI',
        fullname: 'SWISS MARKET INDEX',
      },
      {
        symbol: 'TVC:TRJEFFCRB',
        fullname: 'Thomson Reuters/CoreCommodity CRB Index',
      },
      {
        symbol: 'TVC:DEU40',
        fullname: 'GERMAN STOCK INDEX (DAX)',
      },
      {
        symbol: 'TVC:XAU',
        fullname: 'PHLX GOLD and SILVER SECTOR INDEX',
      },
      {
        symbol: 'TVC:NZ50G',
        fullname: 'NZX 50 INDEX',
      },
      {
        symbol: 'OANDA:HK33HKD',
        fullname: 'Hong Kong 33',
      },
      {
        symbol: 'TVC:OSX',
        fullname: 'PHLX Oil Service Sector',
      },
      {
        symbol: 'TVC:AEX',
        fullname: 'AEX',
      },
      {
        symbol: 'TVC:UTY',
        fullname: 'PHLX Utility Sector',
      },
      {
        symbol: 'OANDA:AU200AUD',
        fullname: 'Australia 200',
      },
      {
        symbol: 'TVC:IBEX35',
        fullname: 'IBEX 35',
      },
    ];

    const stocksResponse = await fetch(
      'https://scanner.tradingview.com/america/scan',
      {
        method: 'POST',
        body: '{"columns":["description"],"range":[0,5000],"sort":{"sortBy":"name","sortOrder":"asc"},"preset":"all_stocks"}',
      },
    );
    const cryptoResponse = await fetch(
      'https://scanner.tradingview.com/coin/scan',
      {
        method: 'POST',
        body: '{"columns":["base_currency_desc"],"range":[0,5000],"sort":{"sortBy":"crypto_total_rank","sortOrder":"asc"},"preset":"coin_market_cap_rank"}',
      },
    );
    const forexResponse = await fetch(
      'https://scanner.tradingview.com/forex/scan',
      {
        method: 'POST',
        body: '{"columns":["description"],"range":[0,5000],"sort":{"sortBy":"name","sortOrder":"asc"},"preset":"forex_rates_all"}',
      },
    );
    const futuresResponse = await fetch(
      'https://scanner.tradingview.com/futures/scan',
      {
        method: 'POST',
        body: '{"columns":["description"],"range":[0,5000],"sort":{"sortBy":"name","sortOrder":"asc"},"preset":"futures_all"}',
      },
    );
    const bondsResponse = await fetch(
      'https://scanner.tradingview.com/bonds/scan',
      {
        method: 'POST',
        body: '{"columns":["description"],"range":[0,5000],"sort":{"sortBy":"index_priority","sortOrder":"asc"},"preset":"bonds_all_yield"}',
      },
    );

    const stocksResponseJson = await stocksResponse.json();
    const cryptoResponseJson = await cryptoResponse.json();
    const forexResponseJson = await forexResponse.json();
    const futuresResponseJson = await futuresResponse.json();
    const bondsResponseJson = await bondsResponse.json();

    const stocks = await stocksResponseJson.data.map((symbol) => {
      const exchangeAndNameArr = symbol.s.split(':');
      return {
        shortName: exchangeAndNameArr[1],
        fullName: symbol.d[0],
        exchange: exchangeAndNameArr[0],
        market: 'stocks',
      };
    });
    const crypto = await cryptoResponseJson.data.map((symbol) => {
      const exchangeAndNameArr = symbol.s.split(':');
      return {
        shortName: exchangeAndNameArr[1],
        fullName: symbol.d[0],
        exchange: exchangeAndNameArr[0],
        market: 'crypto',
      };
    });
    const forex = await forexResponseJson.data.map((symbol) => {
      const exchangeAndNameArr = symbol.s.split(':');
      return {
        shortName: exchangeAndNameArr[1],
        fullName: symbol.d[0],
        exchange: exchangeAndNameArr[0],
        market: 'forex',
      };
    });
    const futures = await futuresResponseJson.data.map((symbol) => {
      const exchangeAndNameArr = symbol.s.split(':');
      return {
        shortName: exchangeAndNameArr[1],
        fullName: symbol.d[0],
        exchange: exchangeAndNameArr[0],
        market: 'futures',
      };
    });
    const bonds = await bondsResponseJson.data.map((symbol) => {
      const exchangeAndNameArr = symbol.s.split(':');
      return {
        shortName: exchangeAndNameArr[1],
        fullName: symbol.d[0],
        exchange: exchangeAndNameArr[0],
        market: 'bonds',
      };
    });
    const indices = indicesArr.map((s) => {
      const exchangeAndNameArr = s.symbol.split(':');
      return {
        shortName: exchangeAndNameArr[1],
        fullName: s.fullname,
        exchange: exchangeAndNameArr[0],
        market: 'indices',
      };
    });

    const allSymbols = [
      ...stocks,
      ...crypto,
      ...forex,
      ...futures,
      ...bonds,
      ...indices,
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
