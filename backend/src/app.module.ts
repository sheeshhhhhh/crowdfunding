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

@Module({
  imports: [AuthModule, PrismaModule, ConfigModule.forRoot({ isGlobal: true }), CampaignModule, FileUploadModule, PaymentModule, DonationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
