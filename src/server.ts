import "dotenv/config";
import app from "./app";
import { prisma } from "./lib/prisma";

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await prisma.$connect();
    console.log("Database connected successfully ✅");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed ❌", error);
    process.exit(1);
  }
}

start();
