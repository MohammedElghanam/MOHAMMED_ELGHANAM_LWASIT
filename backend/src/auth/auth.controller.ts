import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';  
import { Request, Response } from 'express'
import { MailerService } from 'src/mailer/mailer.service';
import { CreateResetPasswordDto } from './dto/create-reset-password.dto';

@Controller('auth')
export class AuthController {
  
  constructor(
    private readonly authService: AuthService,
    private readonly mailerService: MailerService,
  ) {}

  @Post('/register')
  async register(@Body() createAuthDto: CreateAuthDto, @Res() res: Response): Promise<Response> {
      try {
          const result = await this.authService.register(createAuthDto);
          return res.status(201).json({
              message: result.message,
              user: result.user,
          });
      } catch (error) {
          return res.status(400).json({
              message: error.message,
          });
      }
  }

  @Post('/login')
  async login (@Body() createAuthDto: CreateAuthDto, @Res() res: Response): Promise<Response> {
      try {
          const result = await this.authService.login(createAuthDto);
          return res.status(200)
          .set('Authorization', `Bearer ${result.token}`)
          .set('Access-Control-Expose-Headers', 'Authorization')
          .json({
            message: 'Login successful',
            user: {
                name: result.user.name,
                email: result.user.email,
            },
          });
      } catch (error) {
          return res.status(400).json({
              message: error.message,
          });
      }
  }

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string, @Res() res: Response): Promise<Response> {
    
    try {
      
      const resetToken = await this.authService.generateToken(email);
      res
        .cookie('resetToken', resetToken, {
          httpOnly: true,    
          secure: process.env.NODE_ENV === 'production', 
          maxAge: 24 * 60 * 60 * 1000, 
          sameSite: 'strict',
        })
        .json({ message: 'Reset password link sent to your email.' });

      await this.mailerService.sendForgotPasswordEmail(email, resetToken);
      return res;

    } catch (error) {
      console.error('Error sending reset password email:', error.message);
      return res.status(500).json({ message: error.message || 'Failed to send reset password email.' });
    }
  }

  @Post('reset-password')
  async resetPassword(@Body() createResetPasswordDto: CreateResetPasswordDto,  @Req() req: Request): Promise<{ message: string }> {
    try {
      const cookieToken = req.cookies['resetToken'];
      const message = await this.authService.resetPassword(createResetPasswordDto, cookieToken);
      return { message };
    } catch (error) {
      return { message: error.message };
    }
  }

}
