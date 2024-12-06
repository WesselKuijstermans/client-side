import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Game } from "./game";
import { Repository } from "typeorm";
import { Request } from 'express';
import { AuthService } from "../auth/auth.service";

@Injectable()
export class GameService {
    constructor(@InjectRepository(Game) private readonly gameRepository: Repository<Game>, private readonly authService: AuthService) { }

    async findAll(): Promise<Game[]> {
        return this.gameRepository.find();
    }

    async findById(id: number): Promise<Game> {
        return this.gameRepository.findOneBy({ id });
    }

    async findByName(name: string): Promise<Game> {
        return this.gameRepository.findOneBy({ name });
    }

    async create(game: Game): Promise<Game> {
        return this.gameRepository.save(game);
    }

    async update(game: Game, req: Request): Promise<Game> {
        const reqId = this.authService.verifyAuthHeader(req.headers['authorization']);
        if (reqId !== game.developer.createdBy.id) {
            throw new UnauthorizedException('Unauthorized');
        }
        return this.gameRepository.save(game);
    }

    async delete(id: number, req: Request): Promise<void> {
        const reqId = this.authService.verifyAuthHeader(req.headers['authorization']);
        const game = await this.gameRepository.findOneBy({ id });
        if (reqId !== game.developer.createdBy.id) {
            throw new UnauthorizedException('Unauthorized');
        }
        await this.gameRepository.delete(id);
    }
}