import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rating } from './rating';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { AuthService } from '../auth/auth.service';
import { GameService } from '../game/game.service';
import { UserService } from '../user/user.service';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>,
    private readonly authService: AuthService,
    private readonly gameService: GameService,
    private readonly userService: UserService
  ) {}

  async findAllByGame(id: number): Promise<Rating[]> {
    return this.ratingRepository
      .createQueryBuilder('rating')
      .where('rating.gameId = :id', { id: id })
      .getMany();
  }

  async findAllByUser(req: Request): Promise<Rating[]> {
    const id = this.authService.verifyAuthHeader(req.headers['authorization']);
    return this.ratingRepository
      .createQueryBuilder('rating')
      .leftJoinAndSelect('rating.game', 'game')
      .where('rating.userId = :id', { id: id })
      .getMany();
  }

  async create(rating: Rating, req: Request): Promise<Rating> {
    const reqId = this.authService.verifyAuthHeader(
      req.headers['authorization']
    );
    const game = await this.gameService.findById(rating.gameId);
    const user = await this.userService.findById(rating.userId);
    if (reqId !== user.id) {
      throw new UnauthorizedException('Unauthorized');
    }
    rating.game = game;
    rating.user = user;
    return this.ratingRepository.save(rating);
  }

  async update(rating: Rating, req: Request): Promise<Rating> {
    const reqId = this.authService.verifyAuthHeader(
      req.headers['authorization']
    );
    const game = await this.gameService.findById(rating.gameId);
    const user = await this.userService.findById(rating.userId);
    if (reqId !== user.id) {
      throw new UnauthorizedException('Unauthorized');
    }
    rating.game = game;
    rating.user = user;
    return this.ratingRepository.save(rating);
  }
}
