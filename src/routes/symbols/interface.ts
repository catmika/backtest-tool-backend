import { Request } from 'express';
import { MARKET } from '../../models/Symbol.model';

export interface IPagination extends Request {
  query: {
    page: string;
    limit: string;
    sortBy: string;
    sortOrder: string;
    search: string;
    market: MARKET;
  };
}

export interface IPaginationObject {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: string;
  search: string;
  market: MARKET;
}
