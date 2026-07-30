import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

type Props = {
  data: {
    ageGroup: string;
    cases: number;
  }[];
};

export default function AgeDistributionChart({ data }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5">

      <h2 className="text-lg font-semibold mb-4">
        Age Distribution
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="ageGroup" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="cases"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}