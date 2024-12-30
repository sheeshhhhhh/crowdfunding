import { IsOptional, IsString } from "class-validator";

export class MessageDto {
    @IsString()
    message: string;

    @IsOptional()
    @IsString()
    conversationId: string;
}