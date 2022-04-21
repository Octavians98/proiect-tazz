import { Controller, Get, Post } from '@nestjs/common';

@Controller('orders-dispatcher')
export class OrdersDispatcherController {
  @Post()
  create(): string {
    return 'This actions does nothing lol';
  }

  @Get()
  findAll(): string {
    return 'This action also does nothing LOL';
  }
}
