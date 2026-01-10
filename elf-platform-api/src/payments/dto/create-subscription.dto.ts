export class CreateSubscriptionDto {
  amount: number;
  provider: 'MTN' | 'AIRTEL' | 'VISA';
  plan: string;
}
