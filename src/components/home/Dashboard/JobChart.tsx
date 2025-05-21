import { CompositeChart } from "@mantine/charts";

interface Props {
  items: { date: string; sent: number }[];
}

export function JobChart({ items }: Props) {
  return (
    <CompositeChart
      h={300}
      data={items}
      dataKey="date"
      maxBarWidth={30}
      series={[{ name: "sent", label: "Sent", color: "blue.4", type: "line" }]}
      curveType="linear"
      tooltipAnimationDuration={200}
      yAxisProps={{
        tickCount: Math.max(...items.map((item) => item.sent)) + 1,
        allowDecimals: false,
      }}
    />
  );
}
