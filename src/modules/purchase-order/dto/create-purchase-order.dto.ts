import { IsNotEmpty, IsDateString, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreatePurchaseOrderDto {
  @IsString()
  @IsNotEmpty()
  poNumber: string;

  @IsNumber()
  @IsNotEmpty()
  vendorId: number;

  @IsDateString()
  @IsNotEmpty()
  orderDate: string;

  @IsDateString()
  @IsNotEmpty()
  deliveryDate: string;

  @IsNotEmpty()
  items: any;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsDateString()
  @IsNotEmpty()
  issueDate: string;
}
