import { DeliveryType } from '@prisma/client';
import { IsBoolean, IsEnum, IsOptional, IsString, } from 'class-validator';

export class CreateNotificationDto {
    @IsString()
    userId: string;
        
    @IsString()
    title: string;

    @IsString()
    message: string;

    @IsString()
    @IsEnum(DeliveryType)
    type: DeliveryType;

    @IsBoolean()
    @IsOptional()
    isRead?: boolean=false;
}
