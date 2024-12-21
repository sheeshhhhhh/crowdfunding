import { IsEmail, IsString } from 'class-validator'

export class SignUpDto {
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    username: string;
    
    @IsString()
    password: string;
    
    @IsString()
    confirmPassword: string;
}

export class LoginDto {
    @IsString()
    username: string;
    
    @IsString()
    password: string;
}

export class RefreshTokenDto {
    @IsString()
    refreshToken: string;
}