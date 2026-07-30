import { useMemo } from "react";
import ChartCard from "./ChartCard";
import type { SurveillanceCase } from "../../types/SurveillanceCase";

type DiseaseTrendChartProps = {
  data: SurveillanceCase[];
};

export default function DiseaseTrendChart({
  data,
}: DiseaseTrendChartProps) {

  const chartData = useMemo(() => {

    const monthlyCounts: Record<string, number> = {};

    data.forEach((item) => {

      if (!item.Report_Date) return;

      const date = new Date(item.Report_Date);

      // Create key like "2025-01"
      const key = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;

      monthlyCounts[key] = (monthlyCounts[key] || 0) + 1;

    });

    return Object.entries(monthlyCounts)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, count]) => {

        const [year, month] = key.split("-");

        const label = new Date(
          Number(year),
          Number(month) - 1
        ).toLocaleString("default", {
          month: "short",
        });

        return {
          month: label,
          count,
        };

      });

  }, [data]);

return (
  <ChartCard
    title="Disease Trend"
    subtitle="Monthly reported cases"
  >
    <div className="p-4">
      <h2>Testing Chart</h2>

      <p>Total records: {data.length}</p>

      <pre>{JSON.stringify(chartData, null, 2)}</pre>
    </div>
  </ChartCard>
);
}