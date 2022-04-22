import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmptyObject,
  ValidateNested,
} from 'class-validator';
import { Configuration } from './configuration';
import { Courier } from './courier';
import { Order } from './order';

export class CreateAssignmentsRequest {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => Configuration)
  readonly configuration: Configuration;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Courier)
  readonly couriers: Courier[];

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Order)
  readonly orders: Order[];
}
