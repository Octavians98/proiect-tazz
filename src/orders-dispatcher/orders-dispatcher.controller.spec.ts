import { Test, TestingModule } from '@nestjs/testing';
import { OrdersDispatcherController } from './orders-dispatcher.controller';
import { OrdersDispatcherService } from './orders-dispatcher.service';

describe('OrdersDispatcherController', () => {
  let controller: OrdersDispatcherController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersDispatcherService],
      controllers: [OrdersDispatcherController],
    }).compile();

    controller = module.get<OrdersDispatcherController>(
      OrdersDispatcherController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
