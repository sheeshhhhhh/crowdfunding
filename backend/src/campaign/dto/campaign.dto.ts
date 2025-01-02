import { CampaignCategory, CampaignStatus } from '@prisma/client';
import { IsEnum, IsNumberString, IsOptional, IsString } from 'class-validator';

export class CreateCampaignDto {
  @IsString()
  title: string;

  @IsString()
  body: string;

  @IsNumberString() // because of formData
  goal: string;

  @IsString()
  @IsOptional()
  endDate: string;

  @IsOptional()
  @IsString()
  @IsEnum(CampaignCategory)
  category?: CampaignCategory
}

export class UpdateCampaignDto extends CreateCampaignDto {
  // @IsString()
  // @IsEnum(['ACTIVE', 'SUCCESS', 'FAILED'])
  // status: CampaignStatus;
}
