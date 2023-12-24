import express, { Application } from 'express';

const app: Application = express();

app.get('*', (req, res, next) => {
  res.send('HELLOOO');
});

app.listen(process.env.PORT || 3001, () =>
  console.log(`Server is running on port ${process.env.PORT || 3001}`),
);
