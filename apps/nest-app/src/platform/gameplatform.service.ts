import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GamePlatform } from "./gameplatform";
import { Repository } from "typeorm";
import { AuthService } from "../auth/auth.service";
import { GameService } from "../game/game.service";
import { PlatformService } from "../platform/platform.service";

@Injectable()
export class GamePlatformService {
    constructor(
        @InjectRepository(GamePlatform) private readonly gamePlatformRepository: Repository<GamePlatform>, 
        private readonly authService: AuthService,
        private readonly gameService: GameService,
        private readonly platformService: PlatformService        
    ) { }

    async findAllByGame(id: number): Promise<GamePlatform[]> {
        return this.gamePlatformRepository.createQueryBuilder('gamePlatform')
            .where('gamePlatform.gameId = :id', { id: id })
            .getMany();
    }

    async findAllByPlatform(id: number): Promise<GamePlatform[]> {
        return this.gamePlatformRepository.createQueryBuilder('gamePlatform')
            .where('gamePlatform.platformId = :id', { id: id })
            .getMany();
    }

    async create(gamePlatform: GamePlatform): Promise<GamePlatform> {
        const game = await this.gameService.findById(gamePlatform.gameId);
        const platform = await this.platformService.findById(gamePlatform.platformId);
        gamePlatform.game = game;
        gamePlatform.platform = platform;
        return this.gamePlatformRepository.save(gamePlatform);
    }

    async update(gamePlatform: GamePlatform): Promise<GamePlatform> {
        const game = await this.gameService.findById(gamePlatform.gameId);
        const platform = await this.platformService.findById(gamePlatform.platformId)
        gamePlatform.game = game;
        gamePlatform.platform = platform;
        return this.gamePlatformRepository.save(gamePlatform);
    }
}