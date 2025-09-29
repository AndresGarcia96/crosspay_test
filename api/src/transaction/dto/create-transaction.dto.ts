import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CurrencyTypeEnum } from '@/utils/enums/currency_type/currency_type.enum';
import { IdentificationTypeEnum } from '@/utils/enums/id_type/identification_type.enum';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsEnum(CurrencyTypeEnum)
  currency_type: CurrencyTypeEnum;

  @IsNotEmpty()
  @IsNumber()
  transfer_amount: number;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  paying_username: string;

  @IsOptional()
  @IsEnum(IdentificationTypeEnum)
  paying_user_id_type: IdentificationTypeEnum;

  @IsOptional()
  @IsString()
  paying_user_id_number: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(20)
  card_number: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(5)
  card_expiration: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(4)
  card_cvv: string;
}
