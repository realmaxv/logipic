import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  await prisma.weekPlanEntry.createMany({
    data: [
      { day: "Montag", planned: 0 },
      { day: "Dienstag", planned: 0 },
      { day: "Mittwoch", planned: 0 },
      { day: "Donnerstag", planned: 0 },
      { day: "Freitag", planned: 0 },
      { day: "Samstag", planned: 0 },
      { day: "Sonntag", planned: 0 },
    ],
    skipDuplicates: true,
  });
}
main().finally(() => prisma.$disconnect());
