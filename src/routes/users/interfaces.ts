import { Request } from 'express';

export interface IRequestWithUser extends Request {
  user: { name: string; email: string };
}
