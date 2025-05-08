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

  async login ( createAuthDto: CreateAuthDto ): Promise<{ token: string }> {
    const { email, password } = createAuthDto;

    const user = await this.authModel.findOne({ email })
    if( !user ) throw new Error('User not found');

    try {
        const isMatch = await bcrypt.compare(password, user.password)
        if( !isMatch ) throw new Error('Password incorrect');

        console.log('ok');
        

        const token = this.jwtService.sign({ 
            userId: user._id, 
            name: user.name,
            email: user.email, 
        });

        return { token };

    } catch (error) {
        console.error('Login error:', error);
        throw new Error('Login failed');
    }
  }

}
