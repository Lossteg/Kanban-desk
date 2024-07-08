import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { map, Observable } from "rxjs";
import { User } from "../entities/user.entity";
import { Response } from 'express';

@Injectable()
export class TokenInterceptor implements NestInterceptor {
    constructor(private readonly authService: AuthService) {}

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<User> {
        return next.handle().pipe(
            map(user => {
                const response = context.switchToHttp().getResponse<Response>();
                const token = this.authService.signToken(user);

                response.setHeader('Authorization', `Bearer ${token}`);

                return user;
            })
        )
    }
}