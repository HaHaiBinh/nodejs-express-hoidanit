import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

const GlobalOmitConfig = globalThis as unknown as { prisma: PrismaClient };

export const prisma = GlobalOmitConfig.prisma || new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') GlobalOmitConfig.prisma = prisma;

// Tái sử dụng connnection Prisma Client trong quá trình phát triển để tránh tạo nhiều kết nối không cần thiết