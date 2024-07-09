import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TokenExtractorMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.split(' ')[0] === 'Bearer') {
      req['accessToken'] = authHeader.split(' ')[1];
      next();
    } else {
      throw new UnauthorizedException('Access token not provided');
    }
  }
}
