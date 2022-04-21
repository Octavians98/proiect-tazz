import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersDispatcherModule } from './orders-dispatcher/orders-dispatcher.module';

@Module({
  imports: [OrdersDispatcherModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
