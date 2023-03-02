import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('slow')
  getHello(): any {
    return this.appService.process();
  }

  @Get('fast')
  getFaster(): any {
    if (!this.appService.requestInQueue) {
      this.appService.process(); // DO NOT RETURN
      return `Process has started!`;
    }

    return `There is process currently on going! You can check by calling GET /status`;
  }

  @Get('status')
  getStatus(): any {

    if (this.appService.requestInQueue || !this.appService.queue.length) {
      return this.appService.getStatus();
    }

    return {
      message: this.appService.getStatus(),
      result: this.appService.queue
    };
  }
}
