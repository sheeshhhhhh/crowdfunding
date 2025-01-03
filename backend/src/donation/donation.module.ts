import { Module } from '@nestjs/common';
import { CampaignModule } from 'src/campaign/campaign.module';
import { EmailSenderModule } from 'src/email-sender/email-sender.module';
import { InboxModule } from 'src/inbox/inbox.module';
import { PaymentModule } from 'src/payment/payment.module';
import { StripeModule } from 'src/stripe/stripe.module';
import { DonationController } from './donation.controller';
import { DonationService } from './donation.service';

@Module({
  providers: [DonationService],
  controllers: [DonationController],
  exports: [DonationService],
  imports: [PaymentModule, CampaignModule, EmailSenderModule, InboxModule, StripeModule.forRootAsync()],
})
export class DonationModule {}
