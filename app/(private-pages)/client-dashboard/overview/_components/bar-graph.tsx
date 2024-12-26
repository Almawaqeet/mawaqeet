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
import AppModal from '@/components/reusables/AppModal';
import BookingDemo from './booking-demo-video';

export const description = 'See similar statistics for Umrah and Hajj';

const chartData: any[] = [
  // { date: '2024-04-01', umrah: 22, hajj: 15 },
  // { date: '2024-04-02', umrah: 17, hajj: 18 },
  // { date: '2024-04-03', umrah: 16, hajj: 12 },
  // { date: '2024-04-04', umrah: 24, hajj: 26 },
  // { date: '2024-04-05', umrah: 37, hajj: 29 },
  // { date: '2024-04-06', umrah: 30, hajj: 34 },
  // { date: '2024-04-07', umrah: 24, hajj: 18 },
  // { date: '2024-04-08', umrah: 40, hajj: 32 },
  // { date: '2024-04-09', umrah: 15, hajj: 11 },
  // { date: '2024-04-10', umrah: 26, hajj: 19 },
  // { date: '2024-04-11', umrah: 32, hajj: 35 },
  // { date: '2024-04-12', umrah: 29, hajj: 21 },
  // { date: '2024-04-13', umrah: 34, hajj: 38 },
  // { date: '2024-04-14', umrah: 13, hajj: 22 },
  // { date: '2024-04-15', umrah: 12, hajj: 17 }
];

const chartConfig = {
  views: {
    label: 'Booking Views'
  },
  umrah: {
    label: 'Umrah Bookings',
    color: 'hsl(var(--chart-1))'
  },
  hajj: {
    label: 'Hajj Bookings',
    color: 'hsl(var(--chart-2))'
  }
} satisfies ChartConfig;

export function BarGraph({ showDemoVideo}: { showDemoVideo?: React.ReactNode}) {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>('umrah');

  const total = React.useMemo(
    () => ({
      umrah: chartData.reduce((acc, curr) => acc + curr.umrah, 0),
      hajj: chartData.reduce((acc, curr) => acc + curr.hajj, 0)
    }),
    []
  );

  return (

    <Card>
    {showDemoVideo ? (
      <div>
        {/* Card Header */}
        <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
            <CardTitle>Booking Statistics</CardTitle>
            <CardDescription>
              Showing total Umrah and Hajj bookings for the last 15 days
            </CardDescription>
          </div>
          <div className="flex">
            {['umrah', 'hajj'].map((key) => {
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
  
        {/* Card Content */}
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
                    className="w-[150px]"
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
      </div>
    ) : (
      <BookingDemo />
    )}
  </Card>
  
  );
}
