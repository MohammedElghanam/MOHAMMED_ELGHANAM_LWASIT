import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './entities/auth.entity';
import * as bcrypt from 'bcryptjs';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

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


}
