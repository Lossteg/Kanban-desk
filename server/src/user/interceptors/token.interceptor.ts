import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { map, Observable } from "rxjs";
import { User } from "../entities/user.entity";

@Injectable()
export class TokenInterceptor implements NestInterceptor {
    constructor(private readonly authService: AuthService) {}

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        return next.handle().pipe(
            map((user: User) => {
                const accessToken = this.authService.signToken(user);
                const refreshToken = this.authService.signRefreshToken(user);

                return { user, accessToken, refreshToken };
            })
        )
    }
}