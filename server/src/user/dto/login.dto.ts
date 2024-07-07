import { IsDefined, IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {
  @IsEmail()
  @IsDefined()
  readonly email: string;

  @IsDefined()
  @IsNotEmpty()
  readonly password: string;
}