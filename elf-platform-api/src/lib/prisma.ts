import { PrismaClient } from '@prisma/client'

// This prevents multiple instances of Prisma Client in development
const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'], // Optional: logs every SQL query to your terminal
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma