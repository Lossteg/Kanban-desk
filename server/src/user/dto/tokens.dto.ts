import { IsDefined, IsNotEmpty } from "class-validator";

export class TokensDto {
    @IsDefined()
    @IsNotEmpty()
    readonly accessToken: string;
    
    @IsDefined()
    @IsNotEmpty()
    readonly refreshToken: string;
}