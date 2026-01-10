async updateProgress(submissionId: string, studentId: string, answers: any) {
  const submission = await this.prisma.submission.findUnique({
    where: { id: submissionId }
  });

  // Security: Ensure the student owns this submission
  if (submission.studentId !== studentId) {
    throw new ForbiddenException("Unauthorized submission");
  }

  // Check if time has already expired server-side
  if (new Date() > submission.deadlineAt) {
    await this.prisma.submission.update({
      where: { id: submissionId },
      data: { status: 'EXPIRED' }
    });
    throw new BadRequestException("Time has expired. Answers locked.");
  }

  return this.prisma.submission.update({
    where: { id: submissionId },
    data: { answers: answers } // Save partial progress
  });
}