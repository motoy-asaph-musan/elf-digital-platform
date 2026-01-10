@Get("receipt/:paymentId")
async downloadReceipt(@Param("paymentId") id: string, @Res() res: Response) {
  const payment = await this.prisma.payment.findUnique({
    where: { id },
    include: { user: true }
  });

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=ELF-Receipt-${payment.reference}.pdf`);

  const doc = new PDFDocument({ size: 'A4', margin: 50 });
  doc.pipe(res); // Streams directly to user's browser

  // Add a simple Logo text
  doc.fontSize(25).text('ELF DIGITAL PLATFORM', { align: 'center' });
  doc.fontSize(10).text('National Contest Excellence', { align: 'center' });
  doc.moveDown();
  doc.rect(50, 100, 500, 1).stroke(); // Horizontal line

  doc.moveDown();
  doc.fontSize(14).text(`Receipt No: ${payment.internalRef}`);
  doc.text(`Date: ${payment.createdAt.toLocaleDateString()}`);
  doc.text(`Customer: ${payment.user.name}`);
  doc.moveDown();
  doc.fontSize(18).text(`Amount Paid: UGX ${payment.amount.toLocaleString()}`, { bold: true });
  
  doc.end();
}