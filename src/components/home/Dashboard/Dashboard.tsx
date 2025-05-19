import { createSupabaseClient } from "@/utils/supabase/client";

export default async function Dashboard() {
  const supabase = await createSupabaseClient();

  const { data, error } = await supabase
    .from("job_applications")
    .select("*, company:companies (*)");

  if (error) {
    return (
      <>
        <h2>error</h2>
        <pre>{JSON.stringify(error)}</pre>
      </>
    );
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>data</h2>
      <pre>{JSON.stringify(data)}</pre>
    </div>
  );
}
