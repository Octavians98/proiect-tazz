import { IsNumber, IsString } from 'class-validator';

export class Courier {
  @IsNumber()
  readonly id: number;

  @IsString()
  readonly name: string;

  @IsNumber()
  readonly lat: number;

  @IsNumber()
  readonly lon: number;
}
