@Injectable()
export class VisaProvider {
  initiate(payment: Payment) {
    return {
      message: 'Visa payment initiated',
      reference: payment.reference,
    };
  }
}
