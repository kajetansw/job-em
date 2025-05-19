import type { Database } from "@/models/database";
import { createSupabaseClient } from "@/utils/supabase/client";
import {
  SupabaseError,
  SupabaseInstantiationError,
} from "@/utils/supabase/errors";
import type { SupabaseClient } from "@supabase/supabase-js";
import { Effect } from "effect";

export class SupabaseService extends Effect.Service<SupabaseService>()(
  "SupabaseService",
  {
    effect: Effect.gen(function* () {
      const client = Effect.tryPromise({
        try: () => createSupabaseClient(),
        catch: (cause) => new SupabaseInstantiationError({ cause }),
      });

      const query = <A, E extends Error | null>(fn: UseQueryFn<A, E>) =>
        Effect.gen(function* () {
          const supabase = yield* client;

          const result = yield* Effect.promise(() => fn(supabase));

          if (result.error) {
            return yield* Effect.fail(
              new SupabaseError({ error: result.error }),
            );
          }

          return result.data;
        });

      return { client, query };
    }),
  },
) {}

type UseQueryFn<A, E extends Error | null> = (
  client: SupabaseClient<Database>,
) => Promise<{ data: A; error: E }> | PromiseLike<{ data: A; error: E }>;
