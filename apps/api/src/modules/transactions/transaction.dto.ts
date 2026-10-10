import { IsDateString, IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export enum CreateTransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
  TRANSFER = 'TRANSFER',
}

export class CreateTransactionDto {
  @IsEnum(CreateTransactionType)
  type!: CreateTransactionType;

  @IsNumber()
  @Min(0.01)
  amount!: number;

  @IsString()
  description!: string;

  @IsOptional()
  @IsString()
  merchant?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsDateString()
  transactionDate!: string;
}
