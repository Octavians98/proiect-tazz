import { Test, TestingModule } from '@nestjs/testing';
import { OrdersDispatcherController } from './orders-dispatcher.controller';

describe('OrdersDispatcherController', () => {
  let controller: OrdersDispatcherController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersDispatcherController],
    }).compile();

    controller = module.get<OrdersDispatcherController>(OrdersDispatcherController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
