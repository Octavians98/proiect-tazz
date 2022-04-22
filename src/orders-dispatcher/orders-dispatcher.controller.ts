import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateAssignmentsResponse } from 'src/shared/presentation/assignments.response';
import { CreateAssignmentsRequest } from 'src/shared/presentation/create.assignments.request';
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
    return 'This action also does nothing LOL';
  }
}
