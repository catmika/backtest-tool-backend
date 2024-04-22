import { Request } from 'express';

export interface IPagination extends Request {
  query: {
    page: string;
    limit: string;
    sortBy: string;
    sortOrder: string;
    search: string;
  };
}

export interface IPaginationObject {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: string;
  search: string;
}
