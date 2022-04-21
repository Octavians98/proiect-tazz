import { Test, TestingModule } from '@nestjs/testing';
import { OrdersDispatcherService } from './orders-dispatcher.service';

describe('OrdersDispatcherService', () => {
  let service: OrdersDispatcherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersDispatcherService],
    }).compile();

    service = module.get<OrdersDispatcherService>(OrdersDispatcherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
