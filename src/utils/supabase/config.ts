import process from "node:process";
import dotenv from "dotenv";
import { Config, Redacted } from "effect";
import { cleanEnv, str } from "envalid";

dotenv.config({
  path: ".env.local",
});

const Env = cleanEnv(process.env, {
  NEXT_PUBLIC_SUPABASE_URL: str(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: str(),
});

export const SupabaseLiveConfig = Config.succeed({
  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  SUPABASE_KEY: Redacted.make(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!),
});
