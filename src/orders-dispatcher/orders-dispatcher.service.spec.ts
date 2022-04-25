import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AssignmentData } from '../shared/presentation/assignments.response';
import { ACTION_TYPE } from '../shared/enums/action-type.enum';
import { CreateAssignmentsRequest } from '../shared/presentation/create.assignments.request';
import { OrdersDispatcherService } from './orders-dispatcher.service';

describe('OrdersDispatcherService', () => {
  let dispatcherService: OrdersDispatcherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersDispatcherService],
    }).compile();

    dispatcherService = await module.resolve<OrdersDispatcherService>(
      OrdersDispatcherService,
    );
  });

  it('should be defined', () => {
    expect(dispatcherService).toBeDefined();
  });
  describe('orderDispatcher', () => {
    it('should return bad request error if courier ids are not unique', async () => {
      const input: CreateAssignmentsRequest = {
        configuration: {
          maxDeliveryTimeMinutes: 40.0,
          courierSpeedKmH: 20.0,
        },
        couriers: [
          {
            id: 1,
            name: 'Example name',
            lat: 45.0,
            lon: 20.0,
          },
          {
            id: 1,
            name: 'Example name2',
            lat: 45.001,
            lon: 20.001,
          },
        ],
        orders: [
          {
            id: 1,
            actions: [
              {
                type: ACTION_TYPE.PICKUP,
                lat: 45.001,
                lon: 20.001,
              },
              {
                type: ACTION_TYPE.DELIVERY,
                lat: 45.004,
                lon: 20.004,
              },
            ],
          },
          {
            id: 2,
            actions: [
              {
                type: ACTION_TYPE.PICKUP,
                lat: 45.002,
                lon: 20.002,
              },
              {
                type: ACTION_TYPE.DELIVERY,
                lat: 45.004,
                lon: 20.004,
              },
            ],
          },
        ],
      };
      try {
        await dispatcherService.assignOrders(input);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
    it('should return bad request error if orders ids are not unique', async () => {
      const input: CreateAssignmentsRequest = {
        configuration: {
          maxDeliveryTimeMinutes: 40.0,
          courierSpeedKmH: 20.0,
        },
        couriers: [
          {
            id: 1,
            name: 'Example name',
            lat: 45.0,
            lon: 20.0,
          },
          {
            id: 2,
            name: 'Example name2',
            lat: 45.001,
            lon: 20.001,
          },
        ],
        orders: [
          {
            id: 1,
            actions: [
              {
                type: ACTION_TYPE.PICKUP,
                lat: 45.001,
                lon: 20.001,
              },
              {
                type: ACTION_TYPE.DELIVERY,
                lat: 45.004,
                lon: 20.004,
              },
            ],
          },
          {
            id: 1,
            actions: [
              {
                type: ACTION_TYPE.PICKUP,
                lat: 45.002,
                lon: 20.002,
              },
              {
                type: ACTION_TYPE.DELIVERY,
                lat: 45.004,
                lon: 20.004,
              },
            ],
          },
        ],
      };
      try {
        await dispatcherService.assignOrders(input);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
    it('should return empty list if no orders can be assigned', async () => {
      const input: CreateAssignmentsRequest = {
        configuration: {
          maxDeliveryTimeMinutes: 40.0,
          courierSpeedKmH: 20.0,
        },
        couriers: [
          {
            id: 1,
            name: 'Example name',
            lat: 45.0,
            lon: 20.0,
          },
          {
            id: 2,
            name: 'Example name2',
            lat: 45.001,
            lon: 20.001,
          },
        ],
        orders: [
          {
            id: 1,
            actions: [
              {
                type: ACTION_TYPE.PICKUP,
                lat: 99.001,
                lon: 99.001,
              },
              {
                type: ACTION_TYPE.DELIVERY,
                lat: 45.004,
                lon: 20.004,
              },
            ],
          },
          {
            id: 2,
            actions: [
              {
                type: ACTION_TYPE.PICKUP,
                lat: 99.002,
                lon: 20.002,
              },
              {
                type: ACTION_TYPE.DELIVERY,
                lat: 99.004,
                lon: 20.004,
              },
            ],
          },
        ],
      };
      const response = await dispatcherService.assignOrders(input);
      expect(response.data.length).toBe(0);
    });
    it('should assign all orders', async () => {
      const input: CreateAssignmentsRequest = {
        configuration: {
          maxDeliveryTimeMinutes: 40.0,
          courierSpeedKmH: 20.0,
        },
        couriers: [
          {
            id: 1,
            name: 'Example name',
            lat: 45.0,
            lon: 20.0,
          },
          {
            id: 2,
            name: 'Example name2',
            lat: 45.001,
            lon: 20.001,
          },
        ],
        orders: [
          {
            id: 1,
            actions: [
              {
                type: ACTION_TYPE.PICKUP,
                lat: 45.001,
                lon: 20.001,
              },
              {
                type: ACTION_TYPE.DELIVERY,
                lat: 45.004,
                lon: 20.004,
              },
            ],
          },
          {
            id: 2,
            actions: [
              {
                type: ACTION_TYPE.PICKUP,
                lat: 45.002,
                lon: 20.002,
              },
              {
                type: ACTION_TYPE.DELIVERY,
                lat: 45.004,
                lon: 20.004,
              },
            ],
          },
          {
            id: 3,
            actions: [
              {
                type: ACTION_TYPE.PICKUP,
                lat: 45.005,
                lon: 20.005,
              },
              {
                type: ACTION_TYPE.DELIVERY,
                lat: 45.008,
                lon: 20.006,
              },
            ],
          },
          {
            id: 4,
            actions: [
              {
                type: ACTION_TYPE.PICKUP,
                lat: 45.001,
                lon: 20.001,
              },
              {
                type: ACTION_TYPE.DELIVERY,
                lat: 45.004,
                lon: 20.004,
              },
            ],
          },
          {
            id: 5,
            actions: [
              {
                type: ACTION_TYPE.PICKUP,
                lat: 45.002,
                lon: 20.002,
              },
              {
                type: ACTION_TYPE.DELIVERY,
                lat: 45.004,
                lon: 20.004,
              },
            ],
          },
          {
            id: 6,
            actions: [
              {
                type: ACTION_TYPE.PICKUP,
                lat: 45.005,
                lon: 20.005,
              },
              {
                type: ACTION_TYPE.DELIVERY,
                lat: 45.008,
                lon: 20.006,
              },
            ],
          },
        ],
      };
      const output = [
        {
          courierId: 2,
          orderId: 1,
          deliveryTimeMinutes: 1.2256509141871759,
        } as AssignmentData,
        {
          courierId: 2,
          orderId: 2,
          deliveryTimeMinutes: 2.859847445489996,
        } as AssignmentData,
        {
          courierId: 2,
          orderId: 3,
          deliveryTimeMinutes: 4.296564216868323,
        } as AssignmentData,
        {
          courierId: 1,
          orderId: 4,
          deliveryTimeMinutes: 1.6342059892911296,
        } as AssignmentData,
        {
          courierId: 1,
          orderId: 5,
          deliveryTimeMinutes: 3.26840252059395,
        } as AssignmentData,
        {
          courierId: 1,
          orderId: 6,
          deliveryTimeMinutes: 4.705119291972278,
        } as AssignmentData,
      ];
      const response = await dispatcherService.assignOrders(input);
      expect(response.data).toEqual(output);
    });
    it('should assign all orders except one', async () => {
      const input: CreateAssignmentsRequest = {
        configuration: {
          maxDeliveryTimeMinutes: 40.0,
          courierSpeedKmH: 20.0,
        },
        couriers: [
          {
            id: 1,
            name: 'Example name',
            lat: 45.0,
            lon: 20.0,
          },
          {
            id: 2,
            name: 'Example name2',
            lat: 45.001,
            lon: 20.001,
          },
        ],
        orders: [
          {
            id: 1,
            actions: [
              {
                type: ACTION_TYPE.PICKUP,
                lat: 45.001,
                lon: 20.001,
              },
              {
                type: ACTION_TYPE.DELIVERY,
                lat: 45.004,
                lon: 20.004,
              },
            ],
          },
          {
            id: 2,
            actions: [
              {
                type: ACTION_TYPE.PICKUP,
                lat: 45.002,
                lon: 20.002,
              },
              {
                type: ACTION_TYPE.DELIVERY,
                lat: 45.004,
                lon: 20.004,
              },
            ],
          },
          {
            id: 3,
            actions: [
              {
                type: ACTION_TYPE.PICKUP,
                lat: 45.005,
                lon: 20.005,
              },
              {
                type: ACTION_TYPE.DELIVERY,
                lat: 45.008,
                lon: 20.006,
              },
            ],
          },
          {
            id: 4,
            actions: [
              {
                type: ACTION_TYPE.PICKUP,
                lat: 45.001,
                lon: 20.001,
              },
              {
                type: ACTION_TYPE.DELIVERY,
                lat: 45.004,
                lon: 20.004,
              },
            ],
          },
          {
            id: 5,
            actions: [
              {
                type: ACTION_TYPE.PICKUP,
                lat: 45.002,
                lon: 20.002,
              },
              {
                type: ACTION_TYPE.DELIVERY,
                lat: 45.004,
                lon: 20.004,
              },
            ],
          },
          {
            id: 6,
            actions: [
              {
                type: ACTION_TYPE.PICKUP,
                lat: 99.005,
                lon: 20.005,
              },
              {
                type: ACTION_TYPE.DELIVERY,
                lat: 45.008,
                lon: 20.006,
              },
            ],
          },
        ],
      };
      const output = [
        {
          courierId: 2,
          orderId: 1,
          deliveryTimeMinutes: 1.2256509141871759,
        } as AssignmentData,
        {
          courierId: 2,
          orderId: 2,
          deliveryTimeMinutes: 2.859847445489996,
        } as AssignmentData,
        {
          courierId: 2,
          orderId: 3,
          deliveryTimeMinutes: 4.296564216868323,
        } as AssignmentData,
        {
          courierId: 1,
          orderId: 4,
          deliveryTimeMinutes: 1.6342059892911296,
        } as AssignmentData,
        {
          courierId: 1,
          orderId: 5,
          deliveryTimeMinutes: 3.26840252059395,
        } as AssignmentData,
      ];
      const response = await dispatcherService.assignOrders(input);
      expect(response.data).toEqual(output);
    });
  });
});
