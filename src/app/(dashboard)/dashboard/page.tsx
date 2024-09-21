"use client";
import Loading from "@/components/loader";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  ChartTooltipContent,
  ChartTooltip,
  ChartContainer,
} from "@/components/ui/chart";
import CurrencyView from "@/components/ui/currency-view";
import { Spinner } from "@/components/ui/spinner";
import useDashboard from "@/hooks/api/useDashboard";

import {
  Pie,
  PieChart,
  CartesianGrid,
  XAxis,
  Line,
  LineChart,
  Bar,
  BarChart,
} from "recharts";

export default function DashboardPage() {
  const { data, isLoading } = useDashboard();
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {isLoading ? (
        <div className="flex w-full h-[80vh] items-center justify-center">
          <Loading />
        </div>
      ) : (
        <main className="flex-1  ">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Current Balance</CardTitle>
                <CardDescription>
                  Your total assets minus liabilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">
                  <CurrencyView>{data?.data?.currentAmount}</CurrencyView>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Income</CardTitle>
                <CardDescription>Your total income</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">
                  <CurrencyView>{data?.data?.totalIncome}</CurrencyView>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Expenses</CardTitle>
                <CardDescription>Your total expenses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">
                  <CurrencyView>{data?.data?.totalExpense}</CurrencyView>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="flex flex-col md:flex-row w-full gap-5 mt-5">
            <Card className="w-full md:w-6/12">
              <CardHeader>
                <CardTitle>Spending Breakdown</CardTitle>
                <CardDescription>
                  Your monthly expenses by category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PiechartcustomChart className="aspect-[4/3]" />
              </CardContent>
            </Card>
            <Card className="w-full md:w-6/12">
              <CardHeader>
                <CardTitle>Income vs Expenses</CardTitle>
                <CardDescription>
                  Your monthly income and expenses over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LinechartChart className="aspect-[4/3]" />
              </CardContent>
            </Card>
          </div>
        </main>
      )}
    </div>
  );
}

function BarchartChart(props) {
  return (
    <div {...props}>
      <ChartContainer
        config={{
          desktop: {
            label: "Desktop",
            color: "hsl(var(--chart-1))",
          },
        }}
        className="min-h-[300px]"
      >
        <BarChart
          accessibilityLayer
          data={[
            { month: "January", desktop: 186 },
            { month: "February", desktop: 305 },
            { month: "March", desktop: 237 },
            { month: "April", desktop: 73 },
            { month: "May", desktop: 209 },
            { month: "June", desktop: 214 },
          ]}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

function PiechartcustomChart(props) {
  return (
    <div {...props}>
      <ChartContainer
        config={{
          visitors: {
            label: "Visitors",
          },
          chrome: {
            label: "Chrome",
            color: "hsl(var(--chart-1))",
          },
          safari: {
            label: "Safari",
            color: "hsl(var(--chart-2))",
          },
          firefox: {
            label: "Firefox",
            color: "hsl(var(--chart-3))",
          },
          edge: {
            label: "Edge",
            color: "hsl(var(--chart-4))",
          },
          other: {
            label: "Other",
            color: "hsl(var(--chart-5))",
          },
        }}
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={[
              { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
              { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
              {
                browser: "firefox",
                visitors: 187,
                fill: "var(--color-firefox)",
              },
              { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
              { browser: "other", visitors: 90, fill: "var(--color-other)" },
            ]}
            dataKey="visitors"
            nameKey="browser"
          />
        </PieChart>
      </ChartContainer>
    </div>
  );
}

function LinechartChart(props) {
  return (
    <div {...props}>
      <ChartContainer
        config={{
          desktop: {
            label: "Desktop",
            color: "hsl(var(--chart-1))",
          },
        }}
      >
        <LineChart
          accessibilityLayer
          data={[
            { month: "January", desktop: 186 },
            { month: "February", desktop: 305 },
            { month: "March", desktop: 237 },
            { month: "April", desktop: 73 },
            { month: "May", desktop: 209 },
            { month: "June", desktop: 214 },
          ]}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Line
            dataKey="desktop"
            type="natural"
            stroke="var(--color-desktop)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}
