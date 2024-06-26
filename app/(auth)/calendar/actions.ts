"use server";

import db from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function getVacations() {
  const vacations = await db.vacation.findMany({
    select: {
      id: true,
      date: true,
      type: true,
      createdAt: true,
      HanilUser: {
        select: {
          koreanName: true,
        },
      },
    },
  });
  return vacations;
}

export type VacationsProps = Prisma.PromiseReturnType<typeof getVacations>;
