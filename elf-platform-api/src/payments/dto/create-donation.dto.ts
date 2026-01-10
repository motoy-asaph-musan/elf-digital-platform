export class CreateDonationDto {
  amount: number;
  provider: 'MTN' | 'AIRTEL' | 'VISA';
  campaign?: string;
  message?: string;
}
