import { Body, Controller, Get, Param, Post, Put, Req } from "@nestjs/common";
import { RatingService } from "./rating.service";
import { Rating } from "./rating";
import { Request } from 'express';

@Controller('rating')
export class RatingController {
    constructor(private readonly ratingService: RatingService) { }

    @Get('game/:id')
    getById(@Param('id') id: number) {
        return this.ratingService.findAllByGame(id);
    }

    @Get('user/:id')
    getByName(@Param('id') id: number) {
        return this.ratingService.findAllByUser(id);
    }

    @Post()
    create(@Body() rating: Rating, @Req() req: Request) {
        console.log("Rating: " + rating);
        return this.ratingService.create(rating, req);
    }

    @Put('update')
    update(@Body('rating') rating: Rating, @Req() req: Request) {
        return this.ratingService.update(rating, req);
    }
}
