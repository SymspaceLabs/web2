import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailchimpService } from './mailchimp.service';
import { MailchimpController } from './mailchimp.controller';

@Module({
  imports: [ConfigModule],
  controllers: [MailchimpController], // Add the controller here
  providers: [MailchimpService],
  exports: [MailchimpService],
})
export class MailchimpModule {}