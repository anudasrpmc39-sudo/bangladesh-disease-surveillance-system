import { useEffect, useState } from "react";

import KpiCard from "../../components/cards/KpiCard";
import DiseaseChart from "../../components/charts/DiseaseChart";
import MonthlyTrendChart from "../../components/charts/MonthlyTrendChart";
import AgeDistributionChart from "../../components/charts/AgeDistributionChart";
import SexDistributionChart from "../../components/charts/SexDistributionChart";

import FilterPanel from "../../components/filters/FilterPanel";
import DateRangeFilter from "../../components/filters/DateRangeFilter";

import type { FilterState } from "../../types/FilterState";
import type { SurveillanceCase } from "../../types/SurveillanceCase";

import BangladeshMap from "../../components/map/BangladeshMap"; 

// TEMPORARILY COMMENTED OUT
// import RecentCasesTable from "../../components/tables/RecentCasesTable";

import { loadSurveillanceData } from "../../services/csvService";

import {
  getDiseaseDistribution,
  getMonthlyTrend,
  getAgeDistribution,
  getSexDistribution,
} from "../../services/statisticsService";

import {
  getDiseases,
  getDistricts,
  getUpazilas,
  filterCases,
} from "../../services/filterService";

export default function Dashboard() {
  const [data, setData] = useState<SurveillanceCase[]>([]);

  // Centralized Filter State
  const [filters, setFilters] = useState<FilterState>({
    disease: "All",
    district: "All",
    upazila: "All",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const records = await loadSurveillanceData();
        setData(records);
      } catch (error) {
        console.error("Failed to load surveillance data:", error);
      }
    }

    fetchData();
  }, []);

  // Reset Upazila whenever District changes
useEffect(() => {
  if (filters.upazila !== "All") {
    setFilters((prev) => ({
      ...prev,
      upazila: "All",
    }));
  }
}, [filters.district]);

  // Filter options
  const diseases = getDiseases(data);
  const districts = getDistricts(data);
  const upazilas = getUpazilas(data, filters.district);

  // Apply Disease/District/Upazila filters
  const filteredData = filterCases(
    data,
    filters.disease,
    filters.district,
    filters.upazila
  );

  // Apply Report Date Filter
  const dateFilteredData = filteredData.filter((record) => {
    if (!filters.startDate && !filters.endDate) {
      return true;
    }

    const reportDate = new Date(record.Report_Date);

    if (
      filters.startDate &&
      reportDate < new Date(filters.startDate)
    ) {
      return false;
    }

    if (
      filters.endDate &&
      reportDate > new Date(filters.endDate)
    ) {
      return false;
    }

    return true;
  });

  // KPI Metrics
  const totalCases = dateFilteredData.length;

  const confirmedCases = dateFilteredData.filter(
    (d) => d.Case_Status === "Confirmed"
  ).length;

  const hospitalizedCases = dateFilteredData.filter(
    (d) => d.Hospitalized === "Yes"
  ).length;

  const deaths = dateFilteredData.filter(
    (d) => d.Outcome === "Death"
  ).length;

  // Charts
  const diseaseData = getDiseaseDistribution(dateFilteredData);

  const monthlyTrendData = getMonthlyTrend(dateFilteredData);

  const ageDistributionData = getAgeDistribution(dateFilteredData);

  const sexDistributionData = getSexDistribution(dateFilteredData);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="mb-8 text-4xl font-bold text-blue-800">
        Bangladesh Disease Surveillance Dashboard
      </h1>

      {/* Report Date Filter */}
      <DateRangeFilter
        onDateChange={(start, end) =>
          setFilters((prev) => ({
            ...prev,
            startDate: start,
            endDate: end,
          }))
        }
      />

      {/* Disease/District/Upazila Filters */}

<FilterPanel
  diseases={diseases}
  districts={districts}
  upazilas={upazilas}

  selectedDisease={filters.disease}
  selectedDistrict={filters.district}
  selectedUpazila={filters.upazila}

  onDiseaseChange={(value) =>
    setFilters((prev) => ({
      ...prev,
      disease: value,
    }))
  }

  onDistrictChange={(value) =>
    setFilters((prev) => ({
      ...prev,
      district: value,
    }))
  }

  onUpazilaChange={(value) =>
    setFilters((prev) => ({
      ...prev,
      upazila: value,
    }))
  }
/> 

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard title="Total Cases" value={totalCases} />
        <KpiCard title="Confirmed Cases" value={confirmedCases} />
        <KpiCard title="Hospitalized Cases" value={hospitalizedCases} />
        <KpiCard title="Deaths" value={deaths} />
      </div>

      {/* Charts */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <DiseaseChart data={diseaseData} />
        <MonthlyTrendChart data={monthlyTrendData} />
        <AgeDistributionChart data={ageDistributionData} />
        <SexDistributionChart data={sexDistributionData} />
      </div>

{/* Bangladesh Map */}
<div className="mt-8">
  <BangladeshMap data={filteredData} />
</div>

{/* Will be enabled later */}
{/* <RecentCasesTable data={dateFilteredData} /> */}

      {/* Will be enabled later */}
      {/* <RecentCasesTable data={dateFilteredData} /> */}
    </div>
  );
}