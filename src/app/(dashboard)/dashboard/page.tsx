"use client";
import DashboardCard from "@/components/dashboard/dashboard-card";
import Loading from "@/components/loader";
import { Button } from "@/components/ui/button";
import { ChartTooltip, ChartContainer } from "@/components/ui/chart";
import CurrencyView from "@/components/ui/currency-view";
import useDashboard from "@/hooks/api/useDashboard";
import useResponsive from "@/hooks/useResponsive";
import { useState } from "react";
import {
  CartesianGrid,
  XAxis,
  Line,
  LineChart,
  Bar,
  BarChart,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export default function DashboardPage() {
  const { data, isLoading } = useDashboard();
  const [isExpense, setIsExpense] = useState(true);
  const dashboardData = data?.data;

  const cards = [
    {
      title: "Current Balance",
      description: "Your total assets minus liabilities",
      value: data?.data?.currentAmount || "",
    },
    {
      title: "Income",
      description: "Your total income",
      value: data?.data?.totalIncome || "",
    },
    {
      title: "Expenses",
      description: "Your total expenses",
      value: data?.data?.totalExpense || "",
    },
  ];

  const LineChartData = {
    expense: dashboardData?.expenseByDate ?? {},
    income: dashboardData?.incomeByDate ?? {},
  };

  const BarChartData = isExpense
    ? dashboardData?.spendingBreakdown || {}
    : dashboardData?.incomeBreakdown || {};
  return (
    <div className="flex flex-col min-h-[85vh] bg-background">
      {isLoading ? (
        <div className="flex w-full h-[80vh] items-center justify-center">
          <Loading />
        </div>
      ) : (
        <main className="flex-1  ">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cards?.map((item) => {
              return (
                <DashboardCard
                  key={item.title}
                  title={item.title}
                  description={item.description}
                >
                  <div className="text-4xl font-bold">
                    <CurrencyView>{item.value || "0"}</CurrencyView>
                  </div>
                </DashboardCard>
              );
            })}
          </div>
          <div className="flex flex-col lg:flex-row w-full gap-5 mt-5">
            <DashboardCard
              title={isExpense ? "Spending Breakdown" : "Income Breakdown"}
              description={`Your monthly ${
                isExpense ? "expenses" : "income"
              } by category`}
              className="w-full lg:w-1/2"
              additionalHeader={
                <div className="flex items-center">
                  <Button
                    id="expense-income-toggle"
                    variant="outline"
                    size="sm"
                    className="mr-2"
                    onClick={() => {
                      setIsExpense((prev) => !prev);
                    }}
                  >
                    View {`${!isExpense ? "Expense" : "Income"}`}
                  </Button>
                </div>
              }
            >
              <BarchartChart data={BarChartData} />
            </DashboardCard>

            <DashboardCard
              title={"Income vs Expenses"}
              description={`Your monthly income and expenses over time`}
              className="w-full lg:w-1/2"
            >
              <LinechartChart data={LineChartData} className="aspect-[4/3]" />
            </DashboardCard>
          </div>
        </main>
      )}
    </div>
  );
}

function BarchartChart({ data }: any) {
  const { isMobile } = useResponsive();

  const barData = Object.keys(data).map((key) => ({
    category: key,
    amount: data[key],
  }));

  return (
    <div className="w-full h-[300px] md:h-[400px] lg:h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={barData}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="category"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: isMobile ? 10 : 12 }}
            interval={0}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis
            tick={{ fontSize: isMobile ? 10 : 12 }}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white p-2 sm:p-4 rounded-md shadow-lg text-xs sm:text-sm">
                    <p className="font-semibold text-gray-800 mb-1 sm:mb-2">
                      {payload[0].payload.category}
                    </p>
                    <div className="flex items-center justify-between">
                      <CurrencyView className="text-gray-500" />
                      <span className="font-medium text-gray-700">
                        {typeof payload[0].value === "number"
                          ? payload[0].value.toFixed(2)
                          : payload[0].value}
                      </span>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar
            dataKey="amount"
            fill="hsl(var(--primary))"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function LinechartChart({ data }: any) {
  const formatChartData = (data: {
    expense: Record<string, number>;
    income: Record<string, number>;
  }) => {
    return Object.keys(data.expense).map((date) => ({
      date,
      expense: data.expense[date],
      income: data.income[date] || 0,
    }));
  };

  const formattedData = formatChartData(data);

  return (
    <div className="w-full ">
      <ChartContainer
        config={{
          income: {
            label: "Income",
            color: "hsl(var(--chart-1))",
          },
          expense: {
            label: "Expense",
            color: "hsl(var(--chart-2))",
          },
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={formattedData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <ChartTooltip />
            <Line
              type="monotone"
              dataKey="income"
              stroke="hsl(var(--chart-1))"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="expense"
              stroke="hsl(var(--chart-2))"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
