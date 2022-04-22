import { Injectable } from '@nestjs/common';
import {
  AssignmentData,
  CreateAssignmentsResponse,
} from 'src/shared/presentation/assignments.response';
import { CreateAssignmentsRequest } from 'src/shared/presentation/create.assignments.request';

@Injectable()
export class OrdersDispatcherService {
  async assignOrders(
    input: CreateAssignmentsRequest,
  ): Promise<CreateAssignmentsResponse> {
    console.log('Input', JSON.stringify(input));
    const test = new AssignmentData({
      courierId: 3,
      orderId: 4,
      deliveryTimeMinutes: 30.0,
    });
    return new CreateAssignmentsResponse([test, test]);
  }
}
