import {
    Body,
  Controller,
  Get,
  Param,
  Patch,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RequestUser, User } from 'src/guards/user.decorator';
import { JwtAuthGuard } from 'src/guards/jwt.authguard';
import {
  UpdateBillingInformationDto,
  UpdatePasswordDto,
  UpdateUserProfileDto,
} from './dto/user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { IsPublic } from 'src/guards/IsPublic.decorator';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

    @Get('getInitialData')
    async getInitialData(@User() user: RequestUser) {
        return this.userService.getInitialData(user);
    }

    @IsPublic()
    @Get('getProfile/:userId')
    async getProfile(@Param('userId') userId: string) {
        return this.userService.getProfile(userId);
    }

    @Get('getBillingInfo')
    async getBillingInfo(@User() user: RequestUser) {
        return this.userService.getBillingInformation(user);
    }

    @Patch('updatePassword')
    async updatePassword(@User() user: RequestUser, @Body() body: UpdatePasswordDto) {
        return this.userService.updatePassword(user, body);
    }

    @Patch('updateBillingInformation')
    async updateBillingInformation(
        @User() user: RequestUser,
        @Body() body: UpdateBillingInformationDto,
    ) {
        return this.userService.updateBillingInformation(user, body);
    }

    @Patch('updateUserProfile')
    @UseInterceptors(
        FileInterceptor('profile', {
            storage: multer.memoryStorage(),
        }),
    )
    async updateUserProfile(    
        @User() user: RequestUser,
        @UploadedFile() file: Express.Multer.File,
        @Body() body: UpdateUserProfileDto,
    ) {
        console.log(file)
        return this.userService.updateUserProfile(user, file, body);
    }
}
