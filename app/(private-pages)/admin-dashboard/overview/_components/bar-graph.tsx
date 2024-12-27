'use client';

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useGetPackageSummaryMonthly } from '@/api/services/admin-analytics';
import { Skeleton } from '@/components/ui/skeleton';

export const description = 'Booking statistics chart';

const chartConfig = {
  views: {
    label: 'Total Bookings',
  },
  hajj: {
    label: 'Hajj Bookings',
    color: 'hsl(var(--chart-1))',
  },
  umrah: {
    label: 'Umrah Bookings',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export function BarGraph() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>('hajj');

  const { data, isLoading } = useGetPackageSummaryMonthly();

  const chartData = React.useMemo(() => {
    return data?.summary ?? [];
  }, [data]);

  const total = React.useMemo(
    () => ({
      hajj: chartData.reduce((acc, curr) => acc + (curr?.hajj ?? 0), 0),
      umrah: chartData.reduce((acc, curr) => acc + (curr?.umrah ?? 0), 0),
    }),
    [chartData]
  );

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
            <Skeleton className="h-8 w-[200px]" />
            <Skeleton className="h-4 w-[300px]" />
          </div>
          <div className="flex">
            <div className="flex-1 border-t px-6 py-4 sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
              <Skeleton className="h-4 w-[100px] mb-2" />
              <Skeleton className="h-8 w-[80px]" />
            </div>
            <div className="flex-1 border-t border-l px-6 py-4 sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
              <Skeleton className="h-4 w-[100px] mb-2" />
              <Skeleton className="h-8 w-[80px]" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-2 sm:p-6">
          <Skeleton className="h-[280px] w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Booking Statistics</CardTitle>
          <CardDescription>
            Showing total Hajj and Umrah bookings for the last month
          </CardDescription>
        </div>
        <div className="flex">
          {['hajj', 'umrah'].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[280px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px] bg-white"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
