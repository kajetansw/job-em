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

const toChartData = (applications: { created_at: string }[]) => {
  const formatDate = (date: DateTime) => date.toFormat("LLL dd, y");

  const dates = applications.map((d) => DateTime.fromISO(d.created_at));

  const minDate = DateTime.min(...dates) ?? DateTime.now();
  const maxDate = (DateTime.max(...dates) ?? DateTime.now()).plus({ day: 1 });

  const dateRange = Interval.fromDateTimes(minDate, maxDate)
    .splitBy({ day: 1 })
    .map((d) => d.start)
    .filter((date): date is DateTime => date !== null);

  const groupedByCreatedDate = dateRange.reduce<
    Record<string, typeof applications>
  >((acc, currentDate) => {
    const currentDateFormatted = formatDate(currentDate);

    acc[currentDateFormatted] = applications
      .filter(
        (application) =>
          formatDate(DateTime.fromISO(application.created_at)) ===
          currentDateFormatted,
      )
      .map((application) => ({
        ...application,
        created_at: currentDateFormatted,
      }));

    return acc;
  }, {});

  return Object.entries(groupedByCreatedDate).map(([date, applications]) => ({
    date,
    sent: applications.length,
  }));
};
