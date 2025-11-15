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
} from "@/components/ui/chart";
import SubsChart from "./subs-chart";
import SubInsights from "./subs-insights";

export default function SubsSummary() {
  return (
    <Card className="flex">
      <div className="grid grid-cols-2">
        <div>
          <div>
            <CardHeader className="items-center pb-0">
              <CardTitle className="text-fuchsia-900 text-2xl">
                Subscription Type Distribution
              </CardTitle>
              <hr />
            </CardHeader>
            <CardContent className="flex-1 pb-0">
              <SubsChart />
            </CardContent>
          </div>
          <div>
            <CardHeader className="items-center pb-0">
              <CardTitle className="text-fuchsia-900 text-2xl">
                Subscription Insights
              </CardTitle>
              <hr />
            </CardHeader>
            <CardContent className="flex-1 pb-0">
              <SubInsights />
            </CardContent>
          </div>
        </div>
        <div>
          <CardHeader className="items-center pb-0">
            <CardTitle className="text-fuchsia-900 text-2xl">
              Upcoming Subscriptions
            </CardTitle>
            <hr />
          </CardHeader>
        </div>
      </div>
    </Card>
  );
}
