import { createSupabaseClient } from "@/utils/supabase/client";
import { Flex } from "@mantine/core";
import { OngoingRejectedChart } from "./OngoingRejectedChart";
import { SentChart } from "./SentChart";

export default async function Dashboard() {
  const supabase = await createSupabaseClient();

  const sentApplications = await supabase
    .from("job_applications")
    .select("*, company:companies (*)")
    .eq("status", "SENT");

  const ongoingApplications = await supabase
    .from("job_applications")
    .select("*, company:companies (*)")
    .eq("status", "ONGOING");

  const rejectedApplications = await supabase
    .from("job_applications")
    .select("*, company:companies (*)")
    .eq("status", "REJECTED");

  if (
    sentApplications.error ||
    ongoingApplications.error ||
    rejectedApplications.error
  ) {
    return (
      <>
        <h2>error</h2>
        <pre>
          {JSON.stringify(
            sentApplications.error ??
              ongoingApplications.error ??
              rejectedApplications.error,
          )}
        </pre>
      </>
    );
  }

  return (
    <>
      <Flex direction="column" gap="xl">
        <SentChart items={sentApplications.data} />
        <OngoingRejectedChart
          ongoingItems={ongoingApplications.data}
          rejectedItems={rejectedApplications.data}
        />
      </Flex>
    </>
  );
}
