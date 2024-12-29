import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { FileUploadModule } from 'src/file-upload/file-upload.module';
import { DonationModule } from 'src/donation/donation.module';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [FileUploadModule, DonationModule],
})
export class UserModule {}
