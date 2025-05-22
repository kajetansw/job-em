"use client";

import { useFilters } from "@/context/filters";
import { toChartData } from "@/utils/dashboard/toChartData";
import { getDateTimeRangeDays } from "@/utils/getDateTimeRangeDays";
import { CompositeChart } from "@mantine/charts";

interface Props {
  ongoingItems: { created_at: string }[];
  rejectedItems: { created_at: string }[];
}

export function OngoingRejectedChart({ ongoingItems, rejectedItems }: Props) {
  const { dateRange } = useFilters();

  const chartData = toChartData(
    getDateTimeRangeDays(dateRange.start, dateRange.end),
    {
      ongoing: ongoingItems,
      rejected: rejectedItems,
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
            name: "ongoing",
            label: "Ongoing",
            color: "yellow.4",
            type: "area",
          },
          { name: "rejected", label: "Rejected", color: "red.4", type: "area" },
        ]}
        curveType="linear"
        tooltipAnimationDuration={200}
        yAxisProps={{
          tickCount:
            Math.max(
              ...chartData.map((item) => item.ongoing),
              ...chartData.map((item) => item.rejected),
            ) + 1,
          allowDecimals: false,
        }}
        withLegend
        withYAxis={false}
        withPointLabels
      />
    </>
  );
}
