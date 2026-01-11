import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seeding...');

  // 1.5 Create a Superuser
  const adminPassword = await bcrypt.hash('Admin123!', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@elf.com' },
    update: {},
    create: {
      email: 'admin@elf.com',
      name: 'ELF Super Admin',
      password: adminPassword,
      role: 'ADMIN',
      phone: '0700000001'
    },
  });
  console.log(`👤 Admin created: ${admin.email}`);
  

  // 1. Clean up existing data (Order matters because of Relations!)
  await prisma.answer.deleteMany({});
  await prisma.examSession.deleteMany({});
  await prisma.question.deleteMany({});
  await prisma.exam.deleteMany({});
  await prisma.school.deleteMany({});

  // 2. Create a School
  const school = await prisma.school.create({
    data: {
      name: 'ELF Model School',
      region: 'Central',
      address: '123 Education Lane, Kampala',
      contactPhone: '0700000000',
      isRegistered: true,
      schoolCode: 'ELF101',
    },
  });

  // 3. Create an Exam (Matches your UPPER_PRIMARY category)
  const exam = await prisma.exam.create({
    data: {
      title: 'Primary Leaving Mock 2026',
      description: 'Standard practice exam for P.7 students.',
      durationMinutes: 60,
      category: 'UPPER_PRIMARY', // Matches your schema exactly now
      startTime: new Date('2026-01-12T08:00:00Z'),
      endTime: new Date('2026-01-12T17:00:00Z'),
    },
  });

  // 4. Create Questions
  // We'll create them one by one to ensure the examId is linked correctly
  await prisma.question.create({
    data: {
      text: 'What is 15 + 27?',
      options: ['32', '42', '40', '52'],
      correctAnswer: '42',
      points: 5,
      examId: exam.id,
      type: 'MULTIPLE_CHOICE',
    },
  });

  await prisma.question.create({
    data: {
      text: 'Which of the following is a prime number?',
      options: ['4', '9', '13', '15'],
      correctAnswer: '13',
      points: 5,
      examId: exam.id,
      type: 'MULTIPLE_CHOICE',
    },
  });

  console.log('✅ Seeding finished successfully!');
  console.log(`Created School: ${school.name}`);
  console.log(`Created Exam: ${exam.title} (Category: ${exam.category})`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });