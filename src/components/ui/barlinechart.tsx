
import * as React from "react";
import {
  Bar,
  BarChart as RechartsBarChart,
  Line,
  LineChart as RechartsLineChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface BarChartProps {
  data: any[];
  index: string;
  categories: string[];
  colors?: string[];
  valueFormatter?: (value: number) => string;
  className?: string;
}

export function BarChart({
  data,
  index,
  categories,
  colors = ["#2563eb"],
  valueFormatter = (value) => value.toString(),
  className,
}: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={350} className={className}>
      <RechartsBarChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
        <XAxis
          dataKey={index}
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={valueFormatter}
        />
        <Tooltip
          formatter={(value: number) => [valueFormatter(value), ""]}
          labelStyle={{ color: "#1a1a1a" }}
          contentStyle={{ backgroundColor: "white", borderRadius: "6px", borderColor: "#f0f0f0" }}
        />
        {categories.map((category, i) => (
          <Bar
            key={category}
            dataKey={category}
            fill={colors[i % colors.length]}
            radius={[4, 4, 0, 0]}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}

export function LineChart({
  data,
  index,
  categories,
  colors = ["#2563eb"],
  valueFormatter = (value) => value.toString(),
  className,
}: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={350} className={className}>
      <RechartsLineChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis
          dataKey={index}
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={valueFormatter}
        />
        <Tooltip
          formatter={(value: number) => [valueFormatter(value), ""]}
          labelStyle={{ color: "#1a1a1a" }}
          contentStyle={{ backgroundColor: "white", borderRadius: "6px", borderColor: "#f0f0f0" }}
        />
        {categories.map((category, i) => (
          <Line
            key={category}
            type="monotone"
            dataKey={category}
            stroke={colors[i % colors.length]}
            strokeWidth={2}
            dot={{ r: 4, strokeWidth: 2, fill: "white" }}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}
