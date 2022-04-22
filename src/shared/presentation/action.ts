import { IsEnum, IsNumber } from 'class-validator';
import { ACTION_TYPE } from '../enums/action-type.enum';

export class Action {
  @IsEnum(ACTION_TYPE)
  readonly type: ACTION_TYPE;

  @IsNumber()
  readonly lat: number;

  @IsNumber()
  readonly lon: number;
}
