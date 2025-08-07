// lib/prisma.ts
import { PrismaClient } from "../generated/prisma/client"; // Example for a custom path

declare global {
  // Global para evitar recrear instancia en hot reload
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ??
  new PrismaClient({
    log: ["query", "error", "warn"],
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
