import "dotenv/config"; // lädt env damit process.env.DATABASE_URL & PORT verfügbar sind
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const express = require("express");
const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: ["http://localhost:5137", "http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());
