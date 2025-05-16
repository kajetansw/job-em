require("dotenv").config({ path: ".env.local" });

const projectId = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_REF;

if (!projectId) {
  console.error(
    "Error: NEXT_PUBLIC_SUPABASE_PROJECT_REF is not defined in .env.local",
  );
  process.exit(1);
}

const command = `npx supabase gen types typescript --project-id ${projectId} > src/models/database.ts`;
require("node:child_process").execSync(command, { stdio: "inherit" });
