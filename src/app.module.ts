import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as morgan from 'morgan';

@Module({
  imports: [AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // Appling middlewares
    consumer
      .apply(
        cookieParser(),
        compression(),
        helmet(),
        helmet.hidePoweredBy(),
        morgan('tiny'),
      )
      .forRoutes('/');
  }
}
