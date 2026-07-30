import { RotateCcw, Download } from "lucide-react";
import { DashboardFilters as FilterType } from "../../types/dashboard";

type DashboardFiltersProps = {
  filters: FilterType;
  onFiltersChange: (filters: FilterType) => void;

  diseases: string[];
  districts: string[];
  upazilas: string[];
};

export default function DashboardFilters({
  filters,
  onFiltersChange,
  diseases,
  districts,
  upazilas,
}: DashboardFiltersProps) {
  const handleChange = (
    field: keyof FilterType,
    value: string
  ) => {
    onFiltersChange({
      ...filters,
      [field]: value,
    });
  };

  const resetFilters = () => {
    onFiltersChange({
      disease: "",
      district: "",
      upazila: "",
      status: "",
      startDate: "",
      endDate: "",
    });
  };

  return (
    <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-md">

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-7">

        {/* Disease */}

        <select
          value={filters.disease}
          onChange={(e) => handleChange("disease", e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 focus:border-emerald-600 focus:outline-none"
        >
          <option value="">All Diseases</option>

          {diseases.map((disease) => (
            <option key={disease} value={disease}>
              {disease}
            </option>
          ))}
        </select>

        {/* District */}

        <select
          value={filters.district}
          onChange={(e) => handleChange("district", e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 focus:border-emerald-600 focus:outline-none"
        >
          <option value="">All Districts</option>

          {districts.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>

        {/* Upazila */}

        <select
          value={filters.upazila}
          onChange={(e) => handleChange("upazila", e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 focus:border-emerald-600 focus:outline-none"
        >
          <option value="">All Upazilas</option>

          {upazilas.map((upazila) => (
            <option key={upazila} value={upazila}>
              {upazila}
            </option>
          ))}
        </select>

        {/* Status */}

        <select
          value={filters.status}
          onChange={(e) => handleChange("status", e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 focus:border-emerald-600 focus:outline-none"
        >
          <option value="">All Status</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Suspected">Suspected</option>
          <option value="Recovered">Recovered</option>
          <option value="Death">Death</option>
        </select>

        {/* Start Date */}

        <input
          type="date"
          value={filters.startDate}
          onChange={(e) => handleChange("startDate", e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 focus:border-emerald-600 focus:outline-none"
        />

        {/* End Date */}

        <input
          type="date"
          value={filters.endDate}
          onChange={(e) => handleChange("endDate", e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 focus:border-emerald-600 focus:outline-none"
        />

        {/* Buttons */}

        <div className="flex gap-2">

          <button
            onClick={resetFilters}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-slate-700 px-4 py-2 text-white transition hover:bg-slate-800"
          >
            <RotateCcw size={18} />
            Reset
          </button>

          <button
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-700 px-4 py-2 text-white transition hover:bg-emerald-800"
          >
            <Download size={18} />
            Export
          </button>

        </div>

      </div>

    </div>
  );
}