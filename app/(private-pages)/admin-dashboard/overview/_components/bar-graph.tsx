'use client';

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';

export const description = 'Booking statistics chart';

const chartData = [
  { date: '2024-04-01', hajj: 12, umrah: 15 },
  { date: '2024-04-02', hajj: 9, umrah: 18 },
  { date: '2024-04-03', hajj: 16, umrah: 12 },
  { date: '2024-04-04', hajj: 24, umrah: 26 },
  { date: '2024-04-05', hajj: 37, umrah: 29 },
  { date: '2024-04-06', hajj: 30, umrah: 34 },
  { date: '2024-04-07', hajj: 24, umrah: 18 },
  { date: '2024-04-08', hajj: 40, umrah: 32 },
  { date: '2024-04-09', hajj: 5, umrah: 11 },
  { date: '2024-04-10', hajj: 26, umrah: 19 },
  { date: '2024-04-11', hajj: 32, umrah: 35 },
  { date: '2024-04-12', hajj: 29, umrah: 21 },
  { date: '2024-04-13', hajj: 34, umrah: 38 },
  { date: '2024-04-14', hajj: 13, umrah: 22 },
  { date: '2024-04-15', hajj: 12, umrah: 17 },
  { date: '2024-04-16', hajj: 13, umrah: 19 },
  { date: '2024-04-17', hajj: 44, umrah: 36 },
  { date: '2024-04-18', hajj: 36, umrah: 41 },
  { date: '2024-04-19', hajj: 24, umrah: 18 },
  { date: '2024-04-20', hajj: 8, umrah: 15 },
  { date: '2024-04-21', hajj: 13, umrah: 20 },
  { date: '2024-04-22', hajj: 22, umrah: 17 },
  { date: '2024-04-23', hajj: 13, umrah: 23 },
  { date: '2024-04-24', hajj: 38, umrah: 29 },
  { date: '2024-04-25', hajj: 21, umrah: 25 },
  { date: '2024-04-26', hajj: 7, umrah: 13 },
  { date: '2024-04-27', hajj: 38, umrah: 42 },
  { date: '2024-04-28', hajj: 12, umrah: 18 },
  { date: '2024-04-29', hajj: 31, umrah: 24 },
  { date: '2024-04-30', hajj: 45, umrah: 38 }
];

const chartConfig = {
  views: {
    label: 'Total Bookings'
  },
  hajj: {
    label: 'Hajj Bookings',
    color: 'hsl(var(--chart-1))'
  },
  umrah: {
    label: 'Umrah Bookings',
    color: 'hsl(var(--chart-2))'
  }
} satisfies ChartConfig;

export function BarGraph() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>('hajj');

  const total = React.useMemo(
    () => ({
      hajj: chartData.reduce((acc, curr) => acc + curr.hajj, 0),
      umrah: chartData.reduce((acc, curr) => acc + curr.umrah, 0)
    }),
    []
  );

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
              right: 12
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
                  day: 'numeric'
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
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
