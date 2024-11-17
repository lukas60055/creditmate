import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import 'dotenv/config';
import http from 'http';
import { Server } from 'ws';
import router from './routes/indexRoutes';
import notFound from './middlewares/notFound';
import handleError from './middlewares/errorHandler';
import { connectDb } from './config/db';
import ReferenceRate from './models/ReferenceRate';
import CreditCalculation from './models/CreditCalculation';

const app = express();
const port = Number(process.env.PORT || '3050');

const server = http.createServer(app);
const wss = new Server({ server });

app.use(helmet());
app.use(cors());

app.use(express.json({ limit: '10kb' }));

app.use(router);

app.use(notFound);
app.use(handleError);

connectDb().then(() => {
  ReferenceRate.sync();
  CreditCalculation.sync();
});

wss.on('connection', (ws) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('New WebSocket connection');
  }

  ws.send('Hello WebSocket');
});

server.listen(port, () => console.log(`Server running on port ${port}`));
