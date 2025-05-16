import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './entities/auth.entity';
import * as bcrypt from 'bcryptjs';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateResetPasswordDto } from './dto/create-reset-password.dto';

@Injectable()
export class AuthService {

  constructor( 
      @InjectModel(Auth.name) private authModel: Model<Auth>, 
      private jwtService: JwtService        
  ){}

  async register ( createAuthDto: CreateAuthDto ): Promise<{ message: string, user: object | null }> {
      const { name, email, password }= createAuthDto;

      const existingUser = await this.authModel.findOne({ email });
      if (existingUser) throw new BadRequestException('Email is already in use');

      try {
          const hashPassword = await bcrypt.hash(password, 10)
          const user= await this.authModel.create({
              name,
              email,
              password: hashPassword
          })

          return {
              message: "The user has been created successfully and is ready to use the system.",
              user
          }
      } catch (error) {
          console.error('Error creating user:', error);
          throw new BadRequestException('Failed to create user in the database');
      }
  }

  async login ( createAuthDto: CreateAuthDto ): Promise<{ token: string }> {
    const { email, password } = createAuthDto;

    const user = await this.authModel.findOne({ email })
    if( !user ) throw new Error('User not found');

    try {
        const isMatch = await bcrypt.compare(password, user.password)
        // console.log('Password :', password);
        // console.log('user password :', user.password);
        
        if( !isMatch ) throw new Error('Password incorrect');


        const token= await this.generateToken(email);

        return { token };

    } catch (error) {
        console.error('Login error:', error);
        throw new Error('Login failed');
    }
  }

  async generateToken(email: string): Promise<string> {
    try {
      const user = await this.authModel.findOne({ email });
  
      if (!user) {
        throw new Error('User not found');
      }
  
      const token = this.jwtService.sign({
        userId: user._id,
        name: user.name,
        email: user.email,
      });
  
      return token;
    } catch (error) {
      console.error('Error generating token:', error.message);
      throw new Error(error.message || 'Internal server error');
    }
  }

  async resetPassword(createResetPasswordDto: CreateResetPasswordDto, cookieToken: string): Promise<string> {
    const { resetToken, newPassword } = createResetPasswordDto;

    try {

      if (cookieToken !== resetToken) {
        throw new Error('Invalid reset token');
      }

      const payload = this.jwtService.verify(resetToken);
      const user = await this.authModel.findOne({ email: payload.email });

      if (!user) {
        throw new Error('User not found');
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();

      return 'Password successfully updated';
    } catch (error) {
      console.error('Error resetting password:', error);
      throw new Error('Failed to reset password');
    }
  }
  

}
