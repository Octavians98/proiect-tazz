import { Module } from '@nestjs/common';
import { OrdersDispatcherController } from './orders-dispatcher.controller';
import { OrdersDispatcherService } from './orders-dispatcher.service';

@Module({
  controllers: [OrdersDispatcherController],
  providers: [OrdersDispatcherService]
})
export class OrdersDispatcherModule {}
