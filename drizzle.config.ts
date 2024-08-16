import { defineConfig } from "drizzle-kit"
import process from "node:process"

export default defineConfig({
  dialect: "postgresql",
  schema: "./db/schema.ts",
  out: "./db/migrations",
  dbCredentials: {
    url: process.env.DB_URL!,
  }
})
