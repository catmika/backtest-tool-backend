import { Router } from 'express';
import handler from './handler';

const router = Router();

router.get('/symbols', handler.getSymbols);
