import { createSupabaseClient } from "@/utils/supabase/client";
import { Flex } from "@mantine/core";
import { ActiveChart } from "./ActiveChart";
import { SentChart } from "./SentChart";

export default async function Dashboard() {
  const supabase = await createSupabaseClient();

  const applications = await supabase
    .from("job_applications")
    .select("*, company:companies (*)");

  if (applications.error) {
    return (
      <>
        <h2>error</h2>
        <pre>{JSON.stringify(applications.error)}</pre>
      </>
    );
  }

  return (
    <>
      <Flex direction="column" gap="xl">
        <SentChart items={applications.data} />
        <ActiveChart activeItems={applications.data} />
      </Flex>
    </>
  );
}
