import { createSupabaseClient } from "@/utils/supabase/client";
import { groupBy } from "lodash";
import { DateTime } from "luxon";
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

  return <JobChart items={toChartData(data)} />;
}

/*
 * utils
 */

const toChartData = (data: { created_at: string }[]) => {
  const normalizeDates = (d: (typeof data)[number]) => ({
    ...d,
    created_at:
      DateTime.fromISO(d.created_at).startOf("day").toFormat("LLL dd, y") ?? "",
  });

  const groupedByCreatedDate = groupBy(
    data,
    (d) => normalizeDates(d).created_at,
  );

  return Object.entries(groupedByCreatedDate).map(([date, items]) => ({
    date,
    sent: items?.length ?? 0,
  }));
};
