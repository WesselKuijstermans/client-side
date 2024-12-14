import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { JwtModule } from '@nestjs/jwt';
import { Middleware } from '../middleware';
import { DeveloperController } from '../developer/developer.controller';
import { GameController } from '../game/game.controller';
import { RatingController } from '../rating/rating.controller';
import { DeveloperService } from '../developer/developer.service';
import { GameService } from '../game/game.service';
import { RatingService } from '../rating/rating.service';
import { Platform } from '../platform/platform';
import { GamePlatform } from '../platform/gameplatform';
import { PlatformController } from '../platform/platform.controller';
import { PlatformService } from '../platform/platform.service';
import { GamePlatformService } from '../platform/gameplatform.service';
import { GamePlatformController } from '../platform/gameplatform.controller';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5433,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || process.env.POSTGRES_PASSWORD,
      database: process.env.DB_NAME || 'client_side',
      entities: [Developer, Game, Rating, User, Auth, Platform, GamePlatform],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Developer, Game, Rating, User, Auth, Platform, GamePlatform]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AppController, UserController, AuthController, DeveloperController, GameController, RatingController, PlatformController, GamePlatformController],
  providers: [AppService, UserService, AuthService, DeveloperService, GameService, RatingService, PlatformService, GamePlatformService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(Middleware)
      .forRoutes('*');
  }

}
