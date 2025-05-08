import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Response } from 'express'

@Controller('auth')
export class AuthController {
  
  constructor(private readonly authService: AuthService) {}

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


}
