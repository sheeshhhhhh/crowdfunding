import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { DonationService } from './donation.service';
import { RequestUser, User } from 'src/guards/user.decorator';
import { DonationDto, SaveDonationDto } from './dto/donation.dto';
import { JwtAuthGuard } from 'src/guards/jwt.authguard';
import { OptionalAuthGuard } from 'src/guards/OptionalAuth.guard';

@Controller('donation')
export class DonationController {
  constructor(private readonly donationService: DonationService) {}

  @UseGuards(OptionalAuthGuard)
  @Post()
  async createDonationGateway(
    @User() user: RequestUser,
    @Body() body: DonationDto,
  ) {
    return this.donationService.createDonationGateway(user?.id, body);
  }

  @UseGuards(OptionalAuthGuard)
  @Post('check')
  async checkDonations(@User() user: RequestUser, @Body() body: any) {
    return this.donationService.checkDonations(user?.id, body.paymentId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('mydonations')
  async getMyDonations(
    @User() user: RequestUser,
    @Query() query: { search: string; page: number },
  ) {
    return this.donationService.checkMyDonations(
      user,
      query.search,
      query.page,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('Statistics')
  async getDonationStatistics(@User() user: RequestUser) {
    return this.donationService.getDonationStatistics(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('overview')
  async getDonationOverview(@User() user: RequestUser) {
    return this.donationService.getOverview(user);
  }
}
