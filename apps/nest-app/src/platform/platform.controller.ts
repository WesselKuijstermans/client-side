import { Body, Controller, Delete, Get, Param, Post, Put, Req } from "@nestjs/common";
import { PlatformService } from "./platform.service";
import { Platform } from "./platform";
import { Request } from 'express';

@Controller('platform')
export class PlatformController {
    constructor(private readonly platformService: PlatformService) { }

    @Get()
    getAll() {
        return this.platformService.findAll();
    }

    @Get(':id')
    getById(@Param('id') id: number) {
        return this.platformService.findById(id);
    }

    @Post()
    create(@Body('platform') platform: Platform) {
        return this.platformService.create(platform);
    }

    @Put('update')
    update(@Body('platform') platform: Platform, @Req() req: Request) {
        return this.platformService.update(platform, req);
    }

    @Delete('delete/:id')
    delete(@Param('id') id: number, @Req() req: Request) {
        return this.platformService.delete(id, req);
    }
}
