import {
  Injectable,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, UsersService } from './../users';
import { UserCredentials } from './user.credentials';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwt: JwtService) {}

  async verifyToken(token: string): Promise<CreateUserDto> {
    try {
      return await this.jwt.verify(token);
    } catch (err) {
      throw new ForbiddenException();
    }
  }

  private async verifyUserCredentials(userCredentials: UserCredentials) {
    const result = await this.userService.findByEmail(userCredentials.email);
    const comparison = await compare(userCredentials.password, result.password);

    if (result && comparison) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = result;
      return rest;
    }
  }

  async login(userCredentials: UserCredentials) {
    try {
      const user = await this.verifyUserCredentials(userCredentials);
      return this.jwt.sign(user);
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  private async preparePassword(password: string) {
    return await hash(password, await genSalt(10));
  }

  async subscribe(user: CreateUserDto) {
    const { password, ...newUser } = user;

    const encodedPassword = await this.preparePassword(password);

    const createdUser = await this.userService.create({
      ...newUser,
      active: true,
      password: encodedPassword,
    });

    return createdUser;
  }

  async activeAccount(userCredentials: UserCredentials) {
    const user = await this.verifyUserCredentials(userCredentials);
    const result = await this.userService.update(
      { active: true },
      { where: { email: user.email } },
    );
    return !!result;
  }
}
