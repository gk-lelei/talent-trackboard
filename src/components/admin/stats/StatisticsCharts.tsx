
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart } from "@/components/ui/barlinechart";
import { LucideIcon } from "lucide-react";

interface StatisticsChartsProps {
  title: string;
  description: string;
  icon: LucideIcon;
  chartType: "bar" | "line";
  data: any[];
  index: string;
  categories: string[];
  colors?: string[];
  valueFormatter?: (value: number) => string;
}

const StatisticsCharts: React.FC<StatisticsChartsProps> = ({ 
  title,
  description, 
  icon: Icon,
  chartType,
  data, 
  index,
  categories,
  colors = ["#0972fa"],
  valueFormatter = (value) => `${value}`
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            {description}
          </CardDescription>
        </div>
        <Icon className="h-5 w-5 text-gray-500" />
      </CardHeader>
      <CardContent className="pl-2">
        {chartType === "bar" ? (
          <BarChart 
            data={data}
            index={index}
            categories={categories}
            colors={colors}
            valueFormatter={valueFormatter}
            className="h-[300px]"
          />
        ) : (
          <LineChart 
            data={data}
            index={index}
            categories={categories}
            colors={colors}
            valueFormatter={valueFormatter}
            className="h-[300px]"
          />
        )}
      </CardContent>
    </Card>
  );
};

export default StatisticsCharts;
