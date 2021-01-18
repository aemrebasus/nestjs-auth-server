import { ClassProvider, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './../users';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { DatabaseModule } from './../database/database.module';

const appGuardProvider: ClassProvider = process.env.SECURE
  ? {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }
  : { provide: 'null0', useClass: class null0 {} };
@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    JwtModule.register({
      secret: 'Some secret',
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, appGuardProvider],
})
export class AuthModule {}
