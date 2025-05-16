import { createClient } from "@/utils/supabase/client";

export default async function Dashboard() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("companies").select("*");

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>data</h2>
      <pre>{JSON.stringify(data)}</pre>
      <h2>error</h2>
      <pre>{JSON.stringify(error)}</pre>
    </div>
  );
}
