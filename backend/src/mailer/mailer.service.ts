import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {

    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.MAILTRAP_USER,
            pass: process.env.MAILTRAP_PASS,
        },
        });
    }

    async sendForgotPasswordEmail(to: string, resetToken: string) {
        try {
          const info = await this.transporter.sendMail({
            from: '"Support" <support@yourapp.com>',
            to,
            subject: 'Password Reset',
            text: `Click the link to reset your password: http://localhost:3000/reset-password/${resetToken}`,
            html: `
              <h3>Forgot Password</h3>
              <p>Click the link to reset your password: ${resetToken}</p>
              <a href="http://localhost:3000/reset-password/${resetToken}">
                Reset Password
              </a>
            `,
          });
          console.log('Email sent: %s', info);
          return info;
        } catch (error) {
            console.error('Error sending email:', error.message);
            throw new Error(error.message || 'Failed to send email');
        }
    }

}
