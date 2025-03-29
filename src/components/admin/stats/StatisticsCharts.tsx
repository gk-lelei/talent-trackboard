
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart } from "@/components/ui/barlinechart";

interface StatisticsChartsProps {
  applicationChartData: Array<{name: string; applications: number}>;
  jobsByDepartment: Array<{name: string; value: number}>;
}

const StatisticsCharts: React.FC<StatisticsChartsProps> = ({ 
  applicationChartData, 
  jobsByDepartment 
}) => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Recent job applications received
          </CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <BarChart 
            data={applicationChartData}
            index="name"
            categories={["applications"]}
            colors={["#0972fa"]}
            valueFormatter={(value) => `${value} applications`}
            className="h-[200px]"
          />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Jobs by Department</CardTitle>
          <CardDescription>
            Distribution of open positions
          </CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <LineChart 
            data={jobsByDepartment}
            index="name"
            categories={["value"]}
            colors={["#2CA58D"]}
            valueFormatter={(value) => `${value} jobs`}
            className="h-[200px]"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default StatisticsCharts;
