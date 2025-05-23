"use client";

import { useFilters } from "@/context/filters";
import type { JobApplication } from "@/models/jobApplication";
import { toActiveChartData } from "@/utils/dashboard/chartData";
import { getDateTimeRangeDays } from "@/utils/getDateTimeRangeDays";
import { CompositeChart } from "@mantine/charts";

interface Props {
  activeItems: JobApplication[];
}

export function ActiveChart({ activeItems }: Props) {
  const { dateRange } = useFilters();

  const chartData = toActiveChartData(
    getDateTimeRangeDays(dateRange.start, dateRange.end),
    {
      active: activeItems,
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
            name: "active",
            label: "Active every day",
            color: "green.4",
            type: "area",
          },
        ]}
        curveType="linear"
        tooltipAnimationDuration={200}
        yAxisProps={{
          tickCount: Math.max(...chartData.map((item) => item.active)) + 1,
          allowDecimals: false,
        }}
        withLegend
        withYAxis={false}
        withPointLabels
      />
    </>
  );
}
