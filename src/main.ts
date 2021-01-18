// Applicaiton configuration must be loaded first.
//-------------App Configuration ------------------------
import { config } from 'dotenv';
import { join } from 'path';
config({ path: join(process.cwd(), '.config') });
//-------------App Configuration ------------------------

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT, () => {
    console.log('[AuthServer] Listening at port ', process.env.PORT);
  });
}

bootstrap();
