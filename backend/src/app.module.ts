import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { CampaignModule } from './campaign/campaign.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { PaymentModule } from './payment/payment.module';
import { DonationModule } from './donation/donation.module';
import { UpdateModule } from './update/update.module';
import { UserModule } from './user/user.module';
import { InboxModule } from './inbox/inbox.module';
import { EmailSenderModule } from './email-sender/email-sender.module';
import { MessageModule } from './message/message.module';
import { StripeModule } from './stripe/stripe.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    CampaignModule,
    FileUploadModule,
    PaymentModule,
    DonationModule,
    UpdateModule,
    UserModule,
    InboxModule,
    EmailSenderModule,
    MessageModule,
    StripeModule.forRootAsync(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
