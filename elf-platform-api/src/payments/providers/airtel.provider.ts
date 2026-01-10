@Injectable()
export class AirtelProvider {
  initiate(payment: Payment) {
    return {
      message: 'Airtel Money payment initiated',
      reference: payment.reference,
    };
  }
}
