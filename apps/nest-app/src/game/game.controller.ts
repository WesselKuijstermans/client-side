import { Body, Controller, Delete, Get, Param, Post, Put, Req } from "@nestjs/common";
import { GameService } from "./game.service";
import { Game } from "./game";
import { Request } from 'express';

@Controller('game')
export class GameController {
    constructor(private readonly gameService: GameService) { }

    @Get()
    getAll() {
        return this.gameService.findAll();
    }

    @Get('id/:id')
    getById(@Param('id') id: number) {
        return this.gameService.findById(id);
    }

    @Get('name/:name')
    getByName(@Param('name') name: string) {
        return this.gameService.findByName(name);
    }

    @Post()
    create(@Body('game') game: Game) {
        return this.gameService.create(game);
    }

    @Put('update')
    update(@Body('game') game: Game, @Req() req: Request) {
        return this.gameService.update(game, req);
    }

    @Delete('delete/:id')
    delete(@Param('id') id: number, @Req() req: Request) {
        return this.gameService.delete(id, req);
    }
}
