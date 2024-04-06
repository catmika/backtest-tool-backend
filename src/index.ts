import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express, { Application, Request, Response, NextFunction } from 'express';

import connectWithRetry from './util/mongooseInit';
import config from './util/config';
import router from './routes';
import { allowList } from './util/corsOption';
import { handleError } from './util/errorHandler';

const app: Application = express();

app.use(cookieParser());

app.use(bodyParser.json({ limit: '16mb' }));

app.use(bodyParser.urlencoded({ limit: '16mb', extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
  let origin = req.header('Origin');
  if (!origin) origin = 'http://localhost:3001';
  if (allowList.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-Requested-With,Authorization,content-type,X-Source,warehouse, API-KEY',
    );
  }
  next();
});

const startFunction = () => {
  app.emit('ready');
};

connectWithRetry(startFunction);

app.emit('ready');

app.use('/api/v1', router);

app.use(
  express.static(path.resolve(__dirname, process.env.STATIC_DIR || './build/')),
);

app.get('/*', (req, res) => {
  res.sendFile(
    path.resolve(
      __dirname,
      path.join(process.env.STATIC_DIR || './build/', 'index.html'),
    ),
  );
});

app.use(handleError);

app.on('ready', () => {
  app.listen(config.PORT, () => {
    console.log(`Server is running on port: ${config.PORT}`);
  });
});
