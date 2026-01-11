import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SmsService {
  private readonly logger = new Logger(SmsService.name);

  async sendActivationSms(phone: string, schoolName: string, code: string) {
    // Ensure phone is in international format (e.g., +2567...)
    const formattedPhone = phone.startsWith('0') 
      ? `+256${phone.substring(1)}` 
      : phone;

    const message = `Dear Headteacher, ${schoolName} is now activated for ELF 2026. Your Student Access Code is: ${code}. Link: elf-ug.com/register`;

    try {
      // --- Integration Logic for Africa's Talking ---
      // const africastalking = require('africastalking')({
      //   apiKey: process.env.AT_API_KEY,
      //   username: process.env.AT_USERNAME,
      // });
      // await africastalking.SMS.send({ to: [formattedPhone], message });
      
      this.logger.log(`SMS Sent to ${formattedPhone}: ${message}`);
      return true;
    } catch (error) {
      this.logger.error(`SMS Failed for ${schoolName}: ${error.message}`);
      return false;
    }
  }
}