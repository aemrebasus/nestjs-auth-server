import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './../users';

@Module({
  imports: [
    SequelizeModule.forRoot({
      database: process.env.database,
      dialect: 'postgres',
      port: 5432,
      host: process.env.DB_HOST,
      username: process.env.username,
      password: process.env.password,
      models: [User],
      autoLoadModels: true,
      logging: false,
      sync: {
        force: true,
        alter: true,
      },
    }),
  ],
})
export class DatabaseModule {}
