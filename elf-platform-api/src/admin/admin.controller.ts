@Get("stats")
async getStats() {
  const totalDonations = await this.prisma.payment.aggregate({
    where: { status: 'SUCCESS', donation: { isNot: null } },
    _sum: { amount: true }
  });

  const activeSubs = await this.prisma.subscription.count({
    where: { active: true }
  });

  return {
    totalRevenue: totalDonations._sum.amount || 0,
    activeSubscribers: activeSubs
  };
}