import { createSupabaseClient } from "@/utils/supabase/client";
import { Flex } from "@mantine/core";
import { ActiveChart } from "./ActiveChart";
import { SentChart } from "./SentChart";

export default async function Dashboard() {
  const supabase = await createSupabaseClient();

  const sentApplications = await supabase
    .from("job_applications")
    .select("*, company:companies (*)");

  const activeApplications = await supabase
    .from("job_applications")
    .select("*, company:companies (*)")
    .in("status", ["SENT", "ONGOING", "REJECTED"]);

  if (sentApplications.error || activeApplications.error) {
    return (
      <>
        <h2>error</h2>
        <pre>
          {JSON.stringify(sentApplications.error ?? activeApplications.error)}
        </pre>
      </>
    );
  }

  return (
    <>
      <Flex direction="column" gap="xl">
        <SentChart items={sentApplications.data} />
        <ActiveChart activeItems={activeApplications.data} />
      </Flex>
    </>
  );
}
