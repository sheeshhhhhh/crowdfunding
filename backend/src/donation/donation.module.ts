import { Module } from '@nestjs/common';
import { DonationService } from './donation.service';
import { DonationController } from './donation.controller';
import { PaymentModule } from 'src/payment/payment.module';
import { CampaignModule } from 'src/campaign/campaign.module';
import { EmailSenderModule } from 'src/email-sender/email-sender.module';
import { InboxModule } from 'src/inbox/inbox.module';

@Module({
  providers: [DonationService],
  controllers: [DonationController],
  imports: [PaymentModule, CampaignModule, EmailSenderModule, InboxModule],
})
export class DonationModule {}
