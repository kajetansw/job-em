import { createSupabaseClient } from "@/utils/supabase/client";
import { JobChart } from "./JobChart";

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

  return <JobChart items={data} />;
}
