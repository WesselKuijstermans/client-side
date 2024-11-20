import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('person/:id')
  getPerson(@Param('id') id: number) {
    return this.appService.getPerson(id);
  }

  @Get('people')
  getPeople() {
    return this.appService.getPeople();
  }
}
