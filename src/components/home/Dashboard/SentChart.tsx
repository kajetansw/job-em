"use client";

import { useFilters } from "@/context/filters";
import type { JobApplication } from "@/models/jobApplication";
import { toSentChartData } from "@/utils/dashboard/chartData";
import { getDateTimeRangeDays } from "@/utils/getDateTimeRangeDays";
import { CompositeChart } from "@mantine/charts";

interface Props {
  items: JobApplication[];
}

export function SentChart({ items }: Props) {
  const { dateRange } = useFilters();

  const chartData = toSentChartData(
    getDateTimeRangeDays(dateRange.start, dateRange.end),
    {
      sent: items,
    },
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
          {
            name: "sent",
            label: "Sent per day",
            color: "blue.4",
            type: "area",
          },
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
