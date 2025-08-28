import { Controller, Post, Body, Param } from '@nestjs/common';
import { MailchimpService } from './mailchimp.service';

@Controller('email')
export class MailchimpController {
  constructor(private readonly mailchimpService: MailchimpService) {}

  @Post('template/:templateId')
  async sendOtp(
    @Param('templateId') templateId: string,
    @Body() body: { email: string; subject: string; otp: string },
  ) {
    try {
      const { email, subject, otp } = body;
      const response = await this.mailchimpService.sendEmailWithTemplate(email, subject, otp, templateId);
      return {
        success: true,
        message: 'OTP email sent successfully',
        data: response,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to send OTP email',
        error: error.message,
      };
    }
  }
}