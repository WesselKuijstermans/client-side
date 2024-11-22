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
import { Auth } from '../auth/auth';
import { AuthService } from '../auth/auth.service';
import { AuthController } from '../auth/auth.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: process.env.POSTGRES_PASSWORD,
      database: 'client_side',
      entities: [Developer, Game, Rating, User, Auth],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([Developer, Game, Rating, User, Auth]),
  ],
  controllers: [AppController, UserController, AuthController],
  providers: [AppService, UserService, AuthService],
})
export class AppModule {}
