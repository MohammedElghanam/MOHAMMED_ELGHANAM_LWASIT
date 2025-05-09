import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MailerService } from './mailer/mailer.service';
import { MailerModule } from './mailer/mailer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }), 
    MongooseModule.forRoot(process.env.DB_CONNECTION!),
    AuthModule,
    MailerModule
  ],
  controllers: [AppController],
  providers: [AppService, MailerService],
})
export class AppModule {}
