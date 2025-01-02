import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { RequestUser, User } from 'src/guards/user.decorator';
import { CreateCampaignDto, UpdateCampaignDto } from './dto/campaign.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/guards/jwt.authguard';
import { IsPublic } from 'src/guards/IsPublic.decorator';
import * as multer from 'multer';
import { CampaignCategory } from '@prisma/client';

@UseGuards(JwtAuthGuard)
@Controller('campaign')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('headerImage', {
      storage: multer.memoryStorage(),
    }),
  )
  async createCampaign(
    @User() user: RequestUser,
    @Body() body: CreateCampaignDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.campaignService.createCampaign(body, user, file);
  }

  @Get('my-campaigns')
  async getMyCampaigns(@User() user: RequestUser) {
    return this.campaignService.getMyCampaigns(user);
  }

  @IsPublic()
  @Get('browse-campaigns')
  async browseCampaigns(
    @Query() searchQuery: { search: string; page: number; filter: CampaignCategory },
  ) {
    // add search later on
    return this.campaignService.BrowseCampaigns(searchQuery);
  }

  @IsPublic()
  @Get(':id')
  async getCampaign(@Param('id') campaignId: string) {
    return this.campaignService.getCampaign(campaignId);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('headerImage', {
      storage: multer.memoryStorage(),
    }),
  )
  async updateCampaign(
    @User() user: RequestUser,
    @Param('id') campaignId: string,
    @Body() body: UpdateCampaignDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.campaignService.updateCampaign(campaignId, body, file, user);
  }

  @Delete(':id')
  async deleteCampaign(
    @User() user: RequestUser,
    @Param('id') campaignId: string,
  ) {
    return this.campaignService.deleteCampaign(campaignId, user);
  }
}
