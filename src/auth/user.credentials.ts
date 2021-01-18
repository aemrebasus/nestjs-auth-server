import { IsEmail, IsString, Length } from 'class-validator';

export class UserCredentials {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 255)
  password: string;
}
