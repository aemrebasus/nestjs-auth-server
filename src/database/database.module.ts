import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './../users';

@Module({
  imports: [
    SequelizeModule.forRoot({
      database: 'bma',
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      models: [User],
      autoLoadModels: true,
      logging: false,
      sync: {
        // Set them to false in testing.
        force: true,
        alter: true,
      },
    }),
  ],
})
export class DatabaseModule {}
