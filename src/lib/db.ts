import { PrismaClient } from '@prisma/client'
import path from 'path';

const prismaClientSingleton = () => {
  // Use path.join to handle Vercel's serverless environment pathing correctly
  const dbPath = path.join(process.cwd(), 'prisma', 'dev.db');
  
  return new PrismaClient({
    datasources: {
      db: {
        url: `file:${dbPath}`,
      },
    },
  })
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

// Prevent multiple instances of Prisma Client in development
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
