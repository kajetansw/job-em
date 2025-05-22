import { CompositeChart } from "@mantine/charts";

interface Props {
  items: { date: string; sent: number }[];
}

export function SentJobChart({ items }: Props) {
  return (
    <>
      <CompositeChart
        h="40vh"
        data={items}
        dataKey="date"
        maxBarWidth={30}
        xAxisProps={{ padding: { left: 20, right: 20 } }}
        series={[
          { name: "sent", label: "Sent", color: "blue.4", type: "area" },
        ]}
        curveType="linear"
        tooltipAnimationDuration={200}
        yAxisProps={{
          tickCount: Math.max(...items.map((item) => item.sent)) + 1,
          allowDecimals: false,
        }}
        withLegend
        withYAxis={false}
        withPointLabels
      />
    </>
  );
}
