@Controller("payments/webhook")
export class PaymentsWebhookController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async handle(@Body() payload: any) {
    const { reference, status } = payload;

    await this.prisma.payment.update({
      where: { reference },
      data: { status },
    });

    return { received: true };
  }
}
