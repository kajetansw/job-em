import type * as _Supabase from "@supabase/supabase-js";
import { Data } from "effect";

export class SupabaseError<E extends Error> extends Data.TaggedError(
  "SupabaseError",
)<
  Readonly<{
    error: E;
  }>
> {}

export class SupabaseQueryError extends Data.TaggedError("SupabaseQueryError")<
  Readonly<{
    error: _Supabase.PostgrestError;
  }>
> {}

export class SupabaseAuthError extends Data.TaggedError("SupabaseAuthError")<
  Readonly<{
    error: _Supabase.AuthError;
  }>
> {}

export class SupabaseInstantiationError extends Data.TaggedError(
  "SupabaseInstantiationError",
)<{
  cause: unknown;
}> {}
