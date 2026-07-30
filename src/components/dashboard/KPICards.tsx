import {
  Activity,
  Building2,
  CircleAlert,
  Clock3,
  HeartPulse,
  Hospital,
  ShieldCheck,
  Skull,
} from "lucide-react";

import type { SurveillanceCase } from "../../types/SurveillanceCase";
import StatCard from "../common/StatCard";

type KPICardsProps = {
  data: SurveillanceCase[];
};

export default function KPICards({ data }: KPICardsProps) {

  const totalCases = data.length;

  const confirmed = data.filter(
    d => d.Case_Status === "Confirmed"
  ).length;

  const suspected = data.filter(
    d => d.Case_Status === "Suspected"
  ).length;

  const recovered = data.filter(
    d => d.Outcome === "Recovered"
  ).length;

  const deaths = data.filter(
    d => d.Outcome === "Death"
  ).length;

  const hospitalized = data.filter(
    d => d.Hospitalized === "Yes"
  ).length;

  const facilities = new Set(
    data.map(d => d.Facility)
  ).size;

  const averageDelay =
    totalCases === 0
      ? 0
      : (
          data.reduce(
            (sum, d) => sum + d.Reporting_Delay_Days,
            0
          ) / totalCases
        ).toFixed(1);

  return (

    <div className="mb-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

      <StatCard
        title="Total Cases"
        value={totalCases}
        icon={Activity}
        color="bg-blue-600"
      />

      <StatCard
        title="Confirmed"
        value={confirmed}
        icon={ShieldCheck}
        color="bg-emerald-600"
      />

      <StatCard
        title="Suspected"
        value={suspected}
        icon={CircleAlert}
        color="bg-amber-500"
      />

      <StatCard
        title="Recovered"
        value={recovered}
        icon={HeartPulse}
        color="bg-green-600"
      />

      <StatCard
        title="Deaths"
        value={deaths}
        icon={Skull}
        color="bg-red-600"
      />

      <StatCard
        title="Hospitalized"
        value={hospitalized}
        icon={Hospital}
        color="bg-purple-600"
      />

      <StatCard
        title="Avg Delay"
        value={`${averageDelay} Days`}
        icon={Clock3}
        color="bg-orange-600"
      />

      <StatCard
        title="Facilities"
        value={facilities}
        icon={Building2}
        color="bg-indigo-600"
      />

    </div>

  );
}