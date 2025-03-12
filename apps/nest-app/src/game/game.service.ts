import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from './game';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { AuthService } from '../auth/auth.service';
import { GamePlatform } from '../platform/gameplatform';
import { GamePlatformService } from '../platform/gameplatform.service';
import { DeveloperService } from '../developer/developer.service';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game) private readonly gameRepository: Repository<Game>,
    private readonly authService: AuthService,
    @Inject(forwardRef(() => GamePlatformService)) // Use forwardRef here
    private readonly gamePlatformService: GamePlatformService,
    @Inject(forwardRef(() => DeveloperService)) // Use forwardRef here
    private readonly developerService: DeveloperService
  ) {}

  async findAll(): Promise<Game[]> {
    return this.gameRepository.find({
      relations: ['platforms', 'platforms.platform'],
    });
  }

  async findById(id: number): Promise<Game> {
    return this.gameRepository.findOne({
      where: { id },
      relations: ['platforms', 'platforms.platform', 'ratings'],
    });
  }

  async findByName(name: string): Promise<Game> {
    return this.gameRepository.findOneBy({ name });
  }

  async findByUser(req: Request): Promise<Game[]> {
    const reqId = this.authService.verifyAuthHeader(
      req.headers['authorization']
    );
    return this.gameRepository.find({
      where: { developer: { createdBy: { id: reqId } } },
      relations: ['developer', 'developer.createdBy'],
    });
  }

  async findHighestRated(): Promise<Game[]> {
    return this.gameRepository
      .createQueryBuilder('game')
      .leftJoinAndSelect('game.platforms', 'platforms')
      .leftJoinAndSelect('platforms.platform', 'platform')
      .leftJoin('game.ratings', 'rating')
      .addSelect('game.*')
      .addSelect('AVG(rating.rating)', 'avgrating')
      .groupBy('game.id, platforms.gameId, platforms.platformId, platform.id')
      .having('COUNT(rating.review) > 0')
      .orderBy('avgrating', 'DESC')
      .take(5)
      .getMany();
  }

  async create(game: Game): Promise<Game> {
    game.developer = await this.developerService.findById(game.developer.id);
    return this.gameRepository.save(game);
  }

  async createGameWithPlatforms(
    game: Game,
    gamePlatforms: GamePlatform[]
  ): Promise<Game> {
    const savedGame = await this.gameRepository.save(game);

    gamePlatforms.forEach((platform) => {
      platform.gameId = savedGame.id;
    });

    gamePlatforms.forEach(async (gamePlatform) => {
      await this.gamePlatformService.create(gamePlatform);
    });

    return savedGame;
  }

  async update(game: Game, req: Request): Promise<Game> {
    const reqId = this.authService.verifyAuthHeader(
      req.headers['authorization']
    );
    if (reqId !== game.developer.createdBy.id) {
      throw new UnauthorizedException('Unauthorized');
    }
    return this.gameRepository.save(game);
  }

  async delete(id: number, req: Request): Promise<void> {
    const reqId = this.authService.verifyAuthHeader(
      req.headers['authorization']
    );
    const game = await this.gameRepository.findOneBy({ id });
    if (reqId !== game.developer.createdBy.id) {
      throw new UnauthorizedException('Unauthorized');
    }
    await this.gameRepository.delete(id);
  }
}
