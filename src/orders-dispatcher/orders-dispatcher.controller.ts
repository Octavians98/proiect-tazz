import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateAssignmentsResponse } from '../shared/presentation/assignments.response';
import { CreateAssignmentsRequest } from '../shared/presentation/create.assignments.request';
import { OrdersDispatcherService } from './orders-dispatcher.service';
@Controller('orders-dispatcher')
export class OrdersDispatcherController {
  constructor(
    private readonly orderDispatcherService: OrdersDispatcherService,
  ) {}
  @Post()
  @HttpCode(HttpStatus.OK)
  createAssignments(
    @Body() createAssignmentsRequest: CreateAssignmentsRequest,
  ): Promise<CreateAssignmentsResponse> {
    return this.orderDispatcherService.assignOrders(createAssignmentsRequest);
  }

  @Get()
  findAll(): string {
    return 'The GET endpoint is not implemented. In order to test the code send your request to http://localhost:3000/orders-dispatcher';
  }
}
