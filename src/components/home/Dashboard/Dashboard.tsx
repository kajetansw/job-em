import { RuntimeServer } from "@/services/RuntimeServer";
import { SupabaseService } from "@/services/SupabaseService";
import { Effect, Match } from "effect";

const main = Effect.gen(function* () {
  const supabase = yield* SupabaseService;

  const companies = yield* supabase.query((_) => _.auth.getUser());

  return companies ?? [];
});

export default async function Dashboard() {
  const renderCompanies = await RuntimeServer.runPromise(
    main.pipe(
      Effect.match({
        onFailure: Match.valueTags({
          SupabaseInstantiationError: (err) => (
            <div>SupabaseInstantiationError</div>
          ),
          SupabaseError: (err) => <div>SupabaseQueryError</div>,
        }),
        onSuccess: (companies) => (
          <ul>
            {companies.map((c) => (
              <li key={c.id}> {c.name}</li>
            ))}
          </ul>
        ),
      }),
    ),
  );

  return (
    <div>
      <h1>Dashboard</h1>
      {renderCompanies}
    </div>
  );
}
