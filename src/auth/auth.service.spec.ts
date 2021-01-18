import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '../database/database.module';
import { CreateUserDto, UsersModule } from '../resources/users';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('Auth', () => {
  let authService: AuthService;

  const userData: CreateUserDto = {
    password: 'password',
    firstName: 'firstName',
    lastName: 'lastname',
    active: true,
    email: 'email@gmail.com',
    organization: 'org001',
    permissions: ['none'],
    subscriptions: ['subtype'],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        UsersModule,
        JwtModule.register({
          secret: 'Some secret',
          signOptions: { expiresIn: '30d' },
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();
    authService = module.get<AuthService>(AuthService);

    await authService.subscribe(userData);
  });

  it('should subscribe', async () => {
    const result = await authService.subscribe(userData);
    expect(result.email).toBe(userData.email);
  });

  it('should login', async () => {
    const result = await authService.login({
      email: userData.email,
      password: userData.password,
    });

    expect(result).toBeTruthy();
  });
});
