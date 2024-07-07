import { IsDefined, IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class SignUpDto {
  @IsEmail()
  @IsDefined()
  readonly email: string;

  @IsDefined()
  @IsNotEmpty()
  @MinLength(8)
  readonly password: string;
}