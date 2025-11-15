"use client";
import { getSubsQuery } from "@/queries/subscriptions.queries";
import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

export const description = "A simple pie chart";

let chartData = [
  { type: "streaming", count: 0, fill: "var(--chart-1)" },
  { type: "gaming", count: 0, fill: "var(--chart-2)" },
  { type: "educational", count: 0, fill: "var(--chart-3)" },
  { type: "util", count: 0, fill: "var(--chart-4)" },
  { type: "other", count: 0, fill: "var(--chart-5)" },
];

const chartConfig = {
  count: {
    label: "Count",
  },
  streaming: {
    label: "Streaming",
    color: "var(--chart-1)",
  },
  gaming: {
    label: "Gaming",
    color: "var(--chart-2)",
  },
  educational: {
    label: "Educational",
    color: "var(--chart-3)",
  },
  util: {
    label: "Utility",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export default function SubsSummary() {
  const { data: fetchedSubs = [], error, isLoading } = getSubsQuery();
  console.log("SUBS: ", fetchedSubs);
  for (const elem of chartData) {
    elem.count = fetchedSubs.reduce(
      (acc, cur) => (cur.type === elem.type ? ++acc : acc),
      0
    );
  }

  return (
    <>
      {fetchedSubs.length > 0 ? (
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={chartData} dataKey="count" nameKey="type" />
            <ChartLegend
              content={<ChartLegendContent nameKey="type" />}
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      ) : (
        <p>Please add a subscription to see data.</p>
      )}
    </>
  );
}
