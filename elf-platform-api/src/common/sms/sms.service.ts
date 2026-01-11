import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SmsService {
  private readonly logger = new Logger(SmsService.name);

  async sendActivationSms(phone: string, schoolName: string, code: string): Promise<boolean> {
    // 1. Robust Phone Formatting for Uganda (+256)
    let formattedPhone = phone.trim().replace(/\s+/g, ''); // Remove spaces
    
    if (formattedPhone.startsWith('0')) {
      formattedPhone = `+256${formattedPhone.substring(1)}`;
    } else if (!formattedPhone.startsWith('+')) {
      formattedPhone = `+${formattedPhone}`;
    }

    const message = `Dear Headteacher, ${schoolName} is now activated for ELF 2026. Your Student Access Code is: ${code}. Link: elf-ug.com/register`;

    try {
      // --- Africa's Talking Placeholder ---
      // In production, you would use:
      // const AT = require('africastalking')({
      //   apiKey: process.env.AT_API_KEY,
      //   username: process.env.AT_USERNAME,
      // });
      // await AT.SMS.send({ to: [formattedPhone], message });
      
      this.logger.log(`[SMS SUCCESS] To: ${formattedPhone} | Code: ${code}`);
      return true;
    } catch (error: any) {
      // Logic to handle the 'error' type for TypeScript
      const errorMessage = error instanceof Error ? error.message : 'Unknown SMS error';
      this.logger.error(`[SMS FAILED] For ${schoolName}: ${errorMessage}`);
      return false;
    }
  }
}