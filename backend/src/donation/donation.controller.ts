import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { DonationService } from './donation.service';
import { User } from 'src/guards/user.decorator';
import { DonationDto, SaveDonationDto } from './dto/donation.dto';
import { JwtAuthGuard } from 'src/guards/jwt.authguard';

@Controller('donation')
export class DonationController {
    constructor(
        private readonly donationService: DonationService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async createDonationGateway(@User() user: any, @Body() body: DonationDto) {
        return this.donationService.createDonationGateway(user.id, body);
    }

    @UseGuards(JwtAuthGuard)
    @Post('check')
    async checkDonations(@User() user: any, @Body() body: any) {
        return this.donationService.checkDonations(user.id, body.paymentId);
    }
}
