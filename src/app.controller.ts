import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';


/** Роутеры/ должны оставаться тонкими, вся логика занесена в service, который импортируется в конструктор класса контроллер **/
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
