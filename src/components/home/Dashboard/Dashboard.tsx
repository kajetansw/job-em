import { createSupabaseClient } from "@/utils/supabase/client";
import { DateTime, Interval } from "luxon";
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
  const formatDate = (date: DateTime) => date.toFormat("LLL dd, y");

  const dates = data.map((d) => DateTime.fromISO(d.created_at));

  const range = Interval.fromDateTimes(
    DateTime.min(...dates) ?? DateTime.now(),
    DateTime.max(...dates)?.plus({ day: 1 }) ?? DateTime.now(),
  )
    .splitBy({ day: 1 })
    .map((d) => d.start)
    .filter(Boolean) as DateTime[];

  const groupedByCreatedDate = range.reduce(
    (acc, curr) => {
      const toFormattedDate = (dateISO: string) =>
        formatDate(DateTime.fromISO(dateISO));

      return {
        ...acc,
        [formatDate(curr)]: data
          .filter((d) => toFormattedDate(d.created_at) === formatDate(curr))
          .map((d) => ({
            ...d,
            created_at: toFormattedDate(d.created_at),
          })),
      };
    },
    {} as Record<string, typeof data>,
  );

  return Object.entries(groupedByCreatedDate).map(([date, items]) => ({
    date,
    sent: items.length,
  }));
};
