import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsEmail } from "class-validator";

export class CreateSubscriptionDto {
  @ApiProperty({ example: "PLAN_ID_MERCADOPAGO" })
  @IsString()
  @IsNotEmpty()
  preapproval_plan_id: string;

  @ApiProperty({ example: "cliente@ejemplo.com" })
  @IsEmail()
  payer_email: string;

  @ApiProperty({ example: "CARD_TOKEN_ID" })
  @IsString()
  @IsNotEmpty()
  card_token_id: string;

  @ApiProperty({ example: "2025-08-01T00:00:00.000Z" })
  @IsString()
  start_date: string;

  @ApiProperty({ example: "COP" })
  @IsString()
  currency_id: string;
}
