import { IsString } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  currentPassword: string;

  @IsString()
  newPassword: string;

  @IsString()
  confirmPassword: string;
}

export class UpdateBillingInformationDto {
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

export class UpdateUserProfileDto {
  @IsString()
  username: string;

  @IsString()
  email: string;
}
