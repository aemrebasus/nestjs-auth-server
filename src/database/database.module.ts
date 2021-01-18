import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { QueryTypes } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { User } from './../users';

@Module({
  imports: [
    SequelizeModule.forRoot({
      database: process.env.DATABASE,
      dialect: 'postgres',
      port: 5432,
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
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
