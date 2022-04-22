import { IsNumber } from 'class-validator';

export class Configuration {
  @IsNumber()
  readonly maxDeliveryTimeMinutes: number;

  @IsNumber()
  readonly courierSpeedKmH: number;
}
