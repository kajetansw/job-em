"use client";

import { useFilters } from "@/context/filters";
import { getDateTimeRangeDays } from "@/utils/getDateTimeRangeDays";
import { CompositeChart } from "@mantine/charts";
import { DateTime } from "luxon";

interface Props {
  items: { created_at: string }[];
}

export function JobChart({ items }: Props) {
  const { dateRange } = useFilters();

  const chartData = toChartData(
    getDateTimeRangeDays(dateRange.start, dateRange.end),
    items,
  );

  return (
    <>
      <CompositeChart
        h="40vh"
        data={chartData}
        dataKey="date"
        maxBarWidth={30}
        xAxisProps={{ padding: { left: 20, right: 20 } }}
        series={[
          { name: "sent", label: "Sent", color: "blue.4", type: "area" },
        ]}
        curveType="linear"
        tooltipAnimationDuration={200}
        yAxisProps={{
          tickCount: Math.max(...chartData.map((item) => item.sent)) + 1,
          allowDecimals: false,
        }}
        withLegend
        withYAxis={false}
        withPointLabels
      />
    </>
  );
}

/**
 * utils
 */

const toChartData = (
  daysRange: DateTime[],
  applications: { created_at: string }[],
) => {
  const formatDate = (date: DateTime) => date.toFormat("LLL dd, y");

  const groupedByCreatedDate = daysRange.reduce<
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
