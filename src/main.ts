//-------------App Configuration ------------------------

import { join } from 'path';
import { readFileSync } from 'fs';

const CONFIG_PATH = join(process.cwd(), 'config', 'config.json');
const CONFIGURATION = JSON.parse(
  readFileSync(CONFIG_PATH, { encoding: 'utf8' }),
);

for (const [key, value] of Object.entries(
  CONFIGURATION[CONFIGURATION['NODE_ENV']],
)) {
  process.env[key] = value[key];
}
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
