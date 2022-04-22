import { IsNumber } from 'class-validator';

export class Assignment {
  @IsNumber()
  courierId: number;

  @IsNumber()
  orderId: number;

  @IsNumber()
  deliveryTimeMinutes: number;
}
