import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { GamePlatformService } from "./gameplatform.service";
import { GamePlatform } from "./gameplatform";

@Controller('gameplatform')
export class GamePlatformController {
    constructor(private readonly gamePlatformService: GamePlatformService) { }

    @Get('game/:id')
    getAllByGame(@Param('id') id: number) {
        return this.gamePlatformService.findAllByGame(id);
    }

    @Get('platform/:id')
    getAllByPlatform(@Param('id') id: number) {
        return this.gamePlatformService.findAllByPlatform(id);
    }

    @Post()
    create(@Body() gamePlatform: GamePlatform) {
        return this.gamePlatformService.create(gamePlatform);
    }

    @Put()
    update(@Body() gamePlatform: GamePlatform) {
        console.log("GamePlatform: " + gamePlatform.releaseDate);
        return this.gamePlatformService.update(gamePlatform);
    }

    @Delete('game/:id/platform/:platformId')
    delete(@Param('id') id: number, @Param('platformId') platformId: number) {
        return this.gamePlatformService.delete(id, platformId);
    }
}