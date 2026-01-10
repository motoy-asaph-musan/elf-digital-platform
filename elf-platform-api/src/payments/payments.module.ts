@Module({
  controllers: [
    PaymentsController,
    PaymentsWebhookController,
  ],
  providers: [
    PaymentsService,
    MtnProvider,
    AirtelProvider,
    VisaProvider,
  ],
})
export class PaymentsModule {}
