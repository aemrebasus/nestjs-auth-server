import { join } from 'path';
import { readFileSync } from 'fs';

const configPath = join(process.cwd(), 'config', 'config.json');
const path = readFileSync(configPath, { encoding: 'utf8' });
const configs = JSON.parse(path);
const config = configs[configs['NODE_ENV']];

for (const [key, value] of Object.entries(config)) {
  process.env[key] = value as any;
}
