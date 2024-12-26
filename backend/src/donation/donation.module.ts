import { Module } from '@nestjs/common';
import { DonationService } from './donation.service';
import { DonationController } from './donation.controller';
import { PaymentModule } from 'src/payment/payment.module';
import { CampaignModule } from 'src/campaign/campaign.module';

@Module({
  providers: [DonationService],
  controllers: [DonationController],
  imports: [PaymentModule, CampaignModule],
})
export class DonationModule {}
