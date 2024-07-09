import { IsDefined, IsNotEmpty } from "class-validator";

export class RefreshTokenDto {
    @IsDefined()
    @IsNotEmpty()
    readonly refreshToken: string;
}