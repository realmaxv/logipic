import "dotenv/config";
import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));

// Employees - liest alle MA aus MySQL
app.get("/employees", async (_req, res) => {
  const rows = await prisma.employee.findMany({
    // lädt Relation weekdays mit (JOIN)
    include: { weekdays: true },
    // sortiert für eine saubere, stabile Liste
    orderBy: { lastname: "asc" },
  });
  res.json(rows);
});

app.get("/employees/:id", async (req, res) => {
  const row = await prisma.employee.findUnique({
    where: { id: req.params.id },
    include: { weekdays: true },
  });
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(row);
});

app.post("/employees", async (req, res) => {
  const { id, name, lastname, average, weekdays } = req.body;
  if (!name || !lastname || average == null)
    return res.status(400).json({ error: "name, lastname, average required" });
  const created = await prisma.employee.create({
    data: {
      id,
      name,
      lastname,
      average,
      weekdays: {
        create: (weekdays ?? []).map((w: any) => ({
          day: w.day,
          start: w.start,
          end: w.end,
          hours: w.hours,
        })),
      },
    },
    include: { weekdays: true },
  });
  res.status(201).json(created);
});

app.patch("/employees/:id", async (req, res) => {
  const { name, lastname, average, weekdays } = req.body;
  // erst alten Datensatz löschen, dann neu anlegen -> Datensatz nie "halb-aktuallisiert"
  const updated = await prisma.$transaction(async (tx) => {
    await tx.workday.deleteMany({ where: { employeeId: req.params.id } });
    return tx.employee.update({
      where: { id: req.params.id },
      data: {
        ...(name != null && { name }),
        ...(lastname != null && { lastname }),
        ...(average != null && { average }),
        ...(Array.isArray(weekdays) && {
          weekdays: {
            create: weekdays.map((w: any) => ({
              day: w.day,
              start: w.start,
              end: w.end,
              hours: w.hours,
            })),
          },
        }),
      },
      include: { weekdays: true },
    });
  });
  res.json(updated);
});

app.delete("/employees/:id", async (req, res) => {
  await prisma.employee.delete({ where: { id: req.params.id } });
  res.status(204).end(); // 204 -  No Content -> korrekte Anwtort ohne body
});

// Weekplan ->
app.get("/weekplan", async (_req, res) => {
  const rows = await prisma.weekPlanEntry.findMany();
  res.json(Object.fromEntries(rows.map((r) => [r.day, r.planned])));
});
app.put("/weekplan", async (req, res) => {
  const plan = req.body as Record<string, number>;
  const ops = Object.entries(plan).map(([day, planned]) =>
    prisma.weekPlanEntry.upsert({
      where: { day },
      update: { planned },
      create: { day, planned },
    })
  );
  await prisma.$transaction(ops);
  res.json({ ok: true });
});

app.listen(PORT, () => console.log(`API ready on http://localhost:${PORT}`));
