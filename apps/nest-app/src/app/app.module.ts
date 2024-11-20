import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Developer } from '../developer/developer';
import { Game } from '../game/game';
import { Rating } from '../rating/rating';
import { User } from '../user/user';
import { UserController } from '../user/user.controller';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: process.env.POSTGRES_PASSWORD,
      database: 'client_side',
      entities: [Developer, Game, Rating, User],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([Developer, Game, Rating, User]),
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
