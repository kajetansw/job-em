import { createSupabaseClient } from "@/utils/supabase/client";
import { Flex } from "@mantine/core";
import { ActiveChart } from "./ActiveChart";
import { SentChart } from "./SentChart";

export default async function Dashboard() {
  const supabase = await createSupabaseClient();

  const activeApplications = await supabase
    .from("job_applications")
    .select("*, company:companies (*)")
    .neq("status", "INACTIVE");

  if (activeApplications.error) {
    return (
      <>
        <h2>error</h2>
        <pre>{JSON.stringify(activeApplications.error)}</pre>
      </>
    );
  }

  return (
    <>
      <Flex direction="column" gap="xl">
        <SentChart items={activeApplications.data} />
        <ActiveChart activeItems={activeApplications.data} />
      </Flex>
    </>
  );
}
