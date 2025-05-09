import { IsString, IsNotEmpty } from 'class-validator';

export class CreateResetPasswordDto {
    @IsString()
    @IsNotEmpty()
    resetToken: string;

    @IsString()
    @IsNotEmpty()
    newPassword: string;
}