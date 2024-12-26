import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DonationDto {
  @IsNumber()
  amount: number;

  @IsString()
  paymentMethod: string;

  @IsString()
  campaignId: string;
}

export class SaveDonationDto {
  @IsNumber()
  amount: number;

  @IsString()
  paymentMethod: string;

  @IsString()
  paymentId: string;

  @IsString()
  campaignId: string;
}
