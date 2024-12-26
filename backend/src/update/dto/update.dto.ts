import { IsString } from 'class-validator';

export class CreateUpdateDto {
  @IsString()
  message: string;

  @IsString()
  campaignId: string;
}
