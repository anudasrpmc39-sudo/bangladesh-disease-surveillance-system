import { useMemo, useState } from "react";

import DashboardHeader from "./DashboardHeader";
import DashboardFilters from "./DashboardFilters";

import { DashboardFilters as FilterType } from "../../types/dashboard";
import { SurveillanceCase } from "../../types/surveillance";

import KPICards from "./KPICards"; 

import DiseaseTrendChart from "../charts/DiseaseTrendChart";

import BangladeshMap from "../map/BangladeshMap";

type DashboardProps = {
  data: SurveillanceCase[];
};

export default function Dashboard({ data }: DashboardProps) {

  const [filters, setFilters] = useState<FilterType>({
    disease: "",
    district: "",
    upazila: "",
    status: "",
    startDate: "",
    endDate: "",
  });

  const diseases = useMemo(
    () =>
      [...new Set(data.map((d) => d.Disease))]
        .filter(Boolean)
        .sort(),
    [data]
  );

  const districts = useMemo(
    () =>
      [...new Set(data.map((d) => d.District))]
        .filter(Boolean)
        .sort(),
    [data]
  );

  const upazilas = useMemo(
    () =>
      [...new Set(data.map((d) => d.Upazila))]
        .filter(Boolean)
        .sort(),
    [data]
  );

  const filteredData = useMemo(() => {
    return data.filter((item) => {

      const reportDate = new Date(item.Report_Date);

      return (
        (!filters.disease ||
          item.Disease === filters.disease) &&

        (!filters.district ||
          item.District === filters.district) &&

        (!filters.upazila ||
          item.Upazila === filters.upazila) &&

        (!filters.status ||
          item.Case_Status === filters.status) &&

        (!filters.startDate ||
          reportDate >= new Date(filters.startDate)) &&

        (!filters.endDate ||
          reportDate <= new Date(filters.endDate))
      );
    });
  }, [data, filters]);

  return (
    <div className="min-h-screen bg-red-500">

      <div className="mx-auto max-w-7xl p-6">

        <DashboardHeader
          totalCases={data.length}
          totalDistricts={
            new Set(data.map((d) => d.District)).size
          }
          totalFacilities={
            new Set(data.map((d) => d.Facility)).size
          }
          username="Administrator"
          lastUpdated={new Date()}
          systemStatus="Online"
        />

        <DashboardFilters
          filters={filters}
          onFiltersChange={setFilters}
          diseases={diseases}
          districts={districts}
          upazilas={upazilas}
        />


<KPICards data={filteredData} />


<div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">

<DiseaseTrendChart data={filteredData} />

</div>

<div className="mt-6">
  <BangladeshMap data={filteredData} />
</div>

        {/* Charts */}
        {/* <DiseaseTrendChart data={filteredData} /> */}

        {/* Bangladesh Map */}
        {/* <BangladeshMap data={filteredData} /> */}

        {/* Recent Cases */}
        {/* <RecentCasesTable data={filteredData} /> */}


      </div>

    </div>
  );
}