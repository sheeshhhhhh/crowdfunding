import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CampaignModule } from './campaign/campaign.module';
import { DonationModule } from './donation/donation.module';
import { EmailSenderModule } from './email-sender/email-sender.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { InboxModule } from './inbox/inbox.module';
import { MessageModule } from './message/message.module';
import { PaymentModule } from './payment/payment.module';
import { PrismaModule } from './prisma/prisma.module';
import { StripeModule } from './stripe/stripe.module';
import { UpdateModule } from './update/update.module';
import { UserModule } from './user/user.module';

const imports = [
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
  StripeModule.forRootAsync()
]

if(process.env.ENVIRONMENT === 'production') {
  imports.push(ServeStaticModule.forRoot({
    rootPath: join(__dirname, '../../', 'frontend', 'dist'),
  }))
}

@Module({
  imports: imports,
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
