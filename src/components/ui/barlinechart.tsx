
import React from "react";
import { ChartContainer } from "@/components/ui/chart";
import { 
  ResponsiveContainer, 
  BarChart as RechartsBarChart,
  LineChart as RechartsLineChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

interface ChartProps {
  data: any[];
  index: string;
  categories: string[];
  colors?: string[];
  valueFormatter?: (value: number) => string;
  className?: string;
}

export const BarChart = ({
  data,
  index,
  categories,
  colors = ["#0EA5E9"],
  valueFormatter,
  className,
}: ChartProps) => {
  const config = Object.fromEntries(
    categories.map((category, i) => [
      category,
      {
        label: category,
        color: colors[i % colors.length],
      },
    ])
  );

  return (
    <ChartContainer config={config} className={className}>
      <RechartsBarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey={index}
          tickLine={false}
          axisLine={false}
          padding={{ left: 10, right: 10 }}
          tick={{ fontSize: 12 }}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12 }}
          tickFormatter={(value) => 
            valueFormatter ? valueFormatter(value) : value.toString()
          }
        />
        <Tooltip 
          formatter={(value: number) => 
            valueFormatter ? valueFormatter(value) : value.toString()
          }
        />
        {categories.map((category, i) => (
          <Bar
            key={category}
            dataKey={category}
            fill={colors[i % colors.length]}
            radius={[4, 4, 0, 0]}
            barSize={40}
          />
        ))}
      </RechartsBarChart>
    </ChartContainer>
  );
};

export const LineChart = ({
  data,
  index,
  categories,
  colors = ["#2CA58D"],
  valueFormatter,
  className,
}: ChartProps) => {
  const config = Object.fromEntries(
    categories.map((category, i) => [
      category,
      {
        label: category,
        color: colors[i % colors.length],
      },
    ])
  );

  return (
    <ChartContainer config={config} className={className}>
      <RechartsLineChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey={index}
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12 }}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12 }}
          tickFormatter={(value) => 
            valueFormatter ? valueFormatter(value) : value.toString()
          }
        />
        <Tooltip 
          formatter={(value: number) => 
            valueFormatter ? valueFormatter(value) : value.toString()
          }
        />
        {categories.map((category, i) => (
          <Line
            key={category}
            type="monotone"
            dataKey={category}
            stroke={colors[i % colors.length]}
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        ))}
      </RechartsLineChart>
    </ChartContainer>
  );
};
