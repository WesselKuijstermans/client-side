import { Body, Controller, Delete, Get, Param, Put, Req } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user";
import { Request } from 'express';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    
    @Get()
    getAll() {
        return this.userService.findAll();
    }

    @Get('id/:id')
    getById(@Param('id') id: number) {
        return this.userService.findById(id);
    }

    @Get('email/:email')
    getByEmail(@Param('email') email: string) {
        return this.userService.findByEmail(email);
    }

    @Put('update')
    update(@Body('user') user: User, @Req() req: Request) {
        return this.userService.update(user, req);
    }

    @Delete('delete/:id')
    delete(@Param('id') id: number) {
        return this.userService.delete(id);
    }
}