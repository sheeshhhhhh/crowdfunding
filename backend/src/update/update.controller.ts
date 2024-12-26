import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { UpdateService } from './update.service';
import { RequestUser, User } from 'src/guards/user.decorator';
import { CreateUpdateDto } from './dto/update.dto';
import { JwtAuthGuard } from 'src/guards/jwt.authguard';

@UseGuards(JwtAuthGuard)
@Controller('update')
export class UpdateController {
    constructor(
        private readonly updateService: UpdateService
    ) {}

    @Post()
    async postUpdate(@Body() body: CreateUpdateDto, @User() user: RequestUser) {
        return this.updateService.postUpdate(body, user)
    }

    @Get('getUpdates')
    async getUpdates(@Query('campaignId') campaignId: string) {
        return this.updateService.getUpdates(campaignId)
    }

    @Get(':updateId')
    async getUpdate(@Param('campaignId') campaignId: string) {
        return this.updateService.getUpdate(campaignId)
    }

    @Patch(':updateId')
    async updateUpdate(@Body() body: CreateUpdateDto, @User() user: RequestUser, @Param('updateId') updateId: string) {
        return this.updateService.updateUpdate(body, user, updateId)
    }

    @Delete(':updateId')
    async deleteUpdate(@User() user: RequestUser, @Param('updateId') updateId: string) {
        return this.updateService.deleteUpdate(user, updateId)
    }
}
