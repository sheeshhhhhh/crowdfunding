import { IsNumber, IsString } from 'class-validator';

export class BillingInformation {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  email: string;

  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsString()
  postalCode: string;

  @IsString()
  country: string;
}

export class DonationDto extends BillingInformation {
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
