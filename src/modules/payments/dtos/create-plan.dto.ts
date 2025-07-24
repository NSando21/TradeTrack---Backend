import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePlanDto {
  @ApiProperty({ example: 'Membresía mensual tradetrack' })
  @IsString()
  @IsNotEmpty()
  reason: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  frequency: number;

  @ApiProperty({ example: 'months' })
  @IsString()
  frequency_type: string;

  @ApiProperty({ example: 150000 })
  @IsNumber()
  transaction_amount: number;

  @ApiProperty({ example: 'COP' })
  @IsString()
  currency_id: string;
}
