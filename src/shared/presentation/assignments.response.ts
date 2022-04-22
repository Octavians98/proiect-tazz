import { IsNumber } from 'class-validator';
import { Assignment } from './assignments';

export class AssignmentData {
  @IsNumber()
  readonly courierId: number;

  @IsNumber()
  readonly orderId: number;

  @IsNumber()
  readonly deliveryTimeMinutes: number;

  constructor(obj: Assignment) {
    this.courierId = obj.courierId;
    this.orderId = obj.orderId;
    this.deliveryTimeMinutes = obj.deliveryTimeMinutes;
  }
}

export class CreateAssignmentsResponse {
  readonly data: AssignmentData[];

  constructor(obj: AssignmentData[]) {
    this.data = obj;
  }
}
