import { Module } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CampaignController } from './campaign.controller';
import { FileUploadModule } from 'src/file-upload/file-upload.module';
import { DonationModule } from 'src/donation/donation.module';

@Module({
  providers: [CampaignService],
  controllers: [CampaignController],
  imports: [FileUploadModule],
  exports: [CampaignService],
})
export class CampaignModule {}
