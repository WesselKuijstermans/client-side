import { Body, Controller, Delete, Get, Param, Post, Put, Req } from "@nestjs/common";
import { DeveloperService } from "./developer.service";
import { Developer } from "./developer";
import { Request } from 'express';

@Controller('developer')
export class DeveloperController {
    constructor(private readonly developerService: DeveloperService) { }

    @Get()
    getAll() {
        return this.developerService.findAll();
    }

    @Get('id/:id')
    getById(@Param('id') id: number) {
        return this.developerService.findById(id);
    }

    @Get('name/:name')
    getByName(@Param('name') name: string) {
        return this.developerService.findByName(name);
    }

    @Get('user')
    getByUserId(@Req() req: Request) {
        return this.developerService.findByUserId(req);
    }

    @Post()
    create(@Body() developer: Developer, @Req() req: Request) {
        return this.developerService.create(developer, req);
    }

    @Put()
    update(@Body('developer') developer: Developer, @Req() req: Request) {
        console.log(developer);
        return this.developerService.update(developer, req);
    }

    @Delete(':id')
    delete(@Param('id') id: number, @Req() req: Request) {
        return this.developerService.delete(id, req);
    }
}
