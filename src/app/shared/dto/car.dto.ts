import { BaseDto } from './base.dto';

export interface CarDto extends BaseDto {
  model: string;
  image: string;
  price: number;
}
