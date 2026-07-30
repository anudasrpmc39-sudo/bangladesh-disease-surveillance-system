import { useEffect, useState } from "react";

type Props = {
  onDateChange: (start: string, end: string) => void;
};

export default function DateRangeFilter({
  onDateChange,
}: Props) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

useEffect(() => {
  onDateChange(startDate, endDate);
}, [startDate, endDate]);

  return (
    <div className="mb-6 rounded-xl bg-white p-5 shadow">
      <h2 className="mb-4 text-xl font-semibold text-slate-800">
        Report Date Filter
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">

        <div>
          <label className="mb-1 block text-sm font-medium">
            Start Date
          </label>

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            End Date
          </label>

          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div className="flex items-end">
          <button
            onClick={() => {
              setStartDate("");
              setEndDate("");
            }}
            className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700"
          >
            Reset
          </button>
        </div>

      </div>
    </div>
  );
}