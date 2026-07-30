import { useEffect, useMemo, useState } from "react";
import type { SurveillanceCase } from "../../types/SurveillanceCase";

type Props = {
  data: SurveillanceCase[];
};

const columns = [
  "Case_ID",
  "Disease",
  "District",
  "Upazila",
  "Facility",
  "Onset_Date",
  "Report_Date",
  "Age",
  "Sex",
  "Weight_kg",
  "Case_Status",
  "Hospitalized",
  "Outcome",
  "Reporting_Delay_Days",
] as const;

type SortKey = (typeof columns)[number];

export default function RecentCasesTable({ data }: Props) {
  const [search, setSearch] = useState("");
  const [disease, setDisease] = useState("All");
  const [district, setDistrict] = useState("All");
  const [upazila, setUpazila] = useState("All");
  const [status, setStatus] = useState("All");

  const [sortKey, setSortKey] = useState<SortKey>("Report_Date");
  const [asc, setAsc] = useState(false);

  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(25);

  useEffect(() => {
    setPage(1);
  }, [
    search,
    disease,
    district,
    upazila,
    status,
    rows,
    data,
  ]);

  const diseases = useMemo(
    () => ["All", ...Array.from(new Set(data.map((d) => d.Disease)))],
    [data]
  );

  const districts = useMemo(
    () => ["All", ...Array.from(new Set(data.map((d) => d.District)))],
    [data]
  );

  const upazilas = useMemo(() => {
    return [
      "All",
      ...Array.from(
        new Set(
          data
            .filter(
              (d) =>
                district === "All" ||
                d.District === district
            )
            .map((d) => d.Upazila)
        )
      ),
    ];
  }, [data, district]);

  const filtered = useMemo(() => {
    return data.filter((r) => {
      const okSearch = Object.values(r)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      return (
        okSearch &&
        (disease === "All" ||
          r.Disease === disease) &&
        (district === "All" ||
          r.District === district) &&
        (upazila === "All" ||
          r.Upazila === upazila) &&
        (status === "All" ||
          r.Case_Status === status)
      );
    });
  }, [
    data,
    search,
    disease,
    district,
    upazila,
    status,
  ]);

  const sorted = useMemo(() => {
    const arr = [...filtered];

    arr.sort((a, b) => {
      if (sortKey === "Report_Date") {
        return asc
          ? new Date(a.Report_Date).getTime() -
              new Date(b.Report_Date).getTime()
          : new Date(b.Report_Date).getTime() -
              new Date(a.Report_Date).getTime();
      }

      const av = a[
        sortKey as keyof SurveillanceCase
      ];

      const bv = b[
        sortKey as keyof SurveillanceCase
      ];

      if (
        typeof av === "number" &&
        typeof bv === "number"
      ) {
        return asc ? av - bv : bv - av;
      }

      return asc
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });

    return arr;
  }, [filtered, sortKey, asc]);

  const totalPages = Math.max(
    1,
    Math.ceil(sorted.length / rows)
  );

  const pageRows = sorted.slice(
    (page - 1) * rows,
    page * rows
  );

  function exportCSV() {
    const header = columns.join(",");

    const body = sorted
      .map((r) =>
        columns
          .map((c) => `"${r[c]}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob(
      [header + "\n" + body],
      {
        type: "text/csv",
      }
    );

    const url = URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    const today = new Date()
      .toISOString()
      .split("T")[0];

    link.href = url;
    link.download = `DSIS_Recent_Cases_${today}.csv`;

    link.click();

    URL.revokeObjectURL(url);
  }

  const statusBadge = (
    value: string
  ) => {
    const cls =
      value === "Confirmed"
        ? "bg-green-100 text-green-700"
        : value === "Suspected"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-gray-100 text-gray-700";

    return (
      <span
        className={`rounded-full px-2 py-1 text-xs font-semibold ${cls}`}
      >
        {value}
      </span>
    );
  };

  const outcomeBadge = (
    value: string
  ) => {
    const cls =
      value === "Recovered"
        ? "bg-green-100 text-green-700"
        : value === "Death"
        ? "bg-red-100 text-red-700"
        : "bg-slate-100 text-slate-700";

    return (
      <span
        className={`rounded-full px-2 py-1 text-xs font-semibold ${cls}`}
      >
        {value}
      </span>
    );
  };

  const hospitalizedBadge = (
    value: string
  ) => {
    return (
      <span
        className={`rounded-full px-2 py-1 text-xs font-semibold ${
          value === "Yes"
            ? "bg-blue-100 text-blue-700"
            : "bg-gray-100 text-gray-700"
        }`}
      >
        {value}
      </span>
    );
  };

  const formatDate = (
    value: string
  ) =>
    new Date(value).toLocaleDateString(
      "en-GB"
    );

  const resetFilters = () => {
    setSearch("");
    setDisease("All");
    setDistrict("All");
    setUpazila("All");
    setStatus("All");
    setRows(25);
    setPage(1);
  };

  return (
        <div className="mt-8 rounded-2xl bg-white shadow-xl">

      {/* Header */}
      <div className="border-b p-5">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Recent Reported Cases
            </h2>

            <p className="text-sm text-slate-500">
              Showing the latest disease surveillance records
            </p>
          </div>

          <div className="flex flex-wrap gap-2">

            <button
              onClick={exportCSV}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-white transition hover:bg-emerald-700"
            >
              Export CSV
            </button>

            <button
              onClick={resetFilters}
              className="rounded-lg bg-gray-600 px-4 py-2 text-white transition hover:bg-gray-700"
            >
              Reset Filters
            </button>

          </div>

        </div>

      </div>

      {/* Filters */}

      <div className="grid gap-4 border-b bg-slate-50 p-5 md:grid-cols-2 xl:grid-cols-6">

        <input
          type="text"
          placeholder="🔍 Search cases..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
        />

        <select
          value={disease}
          onChange={(e) => setDisease(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2"
        >
          {diseases.map((d) => (
            <option
              key={d}
              value={d}
            >
              {d}
            </option>
          ))}
        </select>

        <select
          value={district}
          onChange={(e) => {
            setDistrict(e.target.value);
            setUpazila("All");
          }}
          className="rounded-lg border border-slate-300 px-3 py-2"
        >
          {districts.map((d) => (
            <option
              key={d}
              value={d}
            >
              {d}
            </option>
          ))}
        </select>

        <select
          value={upazila}
          onChange={(e) =>
            setUpazila(e.target.value)
          }
          className="rounded-lg border border-slate-300 px-3 py-2"
        >
          {upazilas.map((u) => (
            <option
              key={u}
              value={u}
            >
              {u}
            </option>
          ))}
        </select>

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          className="rounded-lg border border-slate-300 px-3 py-2"
        >
          <option value="All">All Status</option>
          <option value="Confirmed">
            Confirmed
          </option>
          <option value="Suspected">
            Suspected
          </option>
        </select>

        <select
          value={rows}
          onChange={(e) =>
            setRows(Number(e.target.value))
          }
          className="rounded-lg border border-slate-300 px-3 py-2"
        >
          {[10, 25, 50, 100].map((n) => (
            <option
              key={n}
              value={n}
            >
              {n} rows
            </option>
          ))}
        </select>

      </div>

      {/* Summary */}

      <div className="flex flex-wrap items-center justify-between gap-3 border-b bg-blue-50 px-5 py-3 text-sm">

        <div>
          <strong>Total Filtered Cases:</strong>{" "}
          {sorted.length}
        </div>

        <div>
          <strong>Page:</strong>{" "}
          {page} / {totalPages}
        </div>

      </div>

      {/* Table */}

      <div className="max-h-[650px] overflow-auto">

        <table className="min-w-full border-collapse text-sm">

          <thead className="sticky top-0 z-10 bg-blue-700 text-white">

            <tr>

              <th className="px-3 py-3 text-left">
                #
              </th>

              {columns.map((c) => (

                <th
                  key={c}
                  onClick={() => {

                    if (sortKey === c) {
                      setAsc(!asc);
                    } else {
                      setSortKey(c);
                      setAsc(c !== "Report_Date");
                    }

                  }}
                  className="cursor-pointer whitespace-nowrap px-3 py-3 text-left hover:bg-blue-800"
                >

                  <div className="flex items-center gap-1">

                    <span>{c}</span>

                    {sortKey === c && (
                      <span>
                        {asc ? "▲" : "▼"}
                      </span>
                    )}

                  </div>

                </th>

              ))}

            </tr>

          </thead>

          <tbody>

            {pageRows.length === 0 ? (

              <tr>

                <td
                  colSpan={columns.length + 1}
                  className="py-12 text-center text-slate-500"
                >
                  No matching records found.
                </td>

              </tr>

            ) : (

              pageRows.map((r, index) => (

                <tr
                  key={r.Case_ID}
                  className={`border-b transition hover:bg-blue-50 ${
                    index % 2 === 0
                      ? "bg-white"
                      : "bg-slate-50"
                  }`}
                >

                  <td className="px-3 py-3 font-medium">
                    {(page - 1) * rows + index + 1}
                  </td>

                  <td className="px-3 py-3">
                    {r.Case_ID}
                  </td>

                  <td className="px-3 py-3">
                    {r.Disease}
                  </td>

                  <td className="px-3 py-3">
                    {r.District}
                  </td>

                  <td className="px-3 py-3">
                    {r.Upazila}
                  </td>

                  <td className="px-3 py-3">
                    {r.Facility}
                  </td>

                  <td className="px-3 py-3">
                    {formatDate(r.Onset_Date)}
                  </td>

                  <td className="px-3 py-3 font-medium">
                    {formatDate(r.Report_Date)}
                  </td>

                  <td className="px-3 py-3">
                    {r.Age}
                  </td>

                  <td className="px-3 py-3">
                    {r.Sex}
                  </td>

                  <td className="px-3 py-3">
                    {r.Weight_kg}
                  </td>

                  <td className="px-3 py-3">
                    {statusBadge(r.Case_Status)}
                  </td>

                  <td className="px-3 py-3">
                    {hospitalizedBadge(
                      r.Hospitalized
                    )}
                  </td>

                  <td className="px-3 py-3">
                    {outcomeBadge(r.Outcome)}
                  </td>

                  <td className="px-3 py-3">
                    {r.Reporting_Delay_Days}
                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

            {/* Pagination */}

      <div className="flex flex-col gap-4 border-t bg-white p-4 md:flex-row md:items-center md:justify-between">

        <div className="text-sm text-slate-600">

          Showing{" "}
          <span className="font-semibold">
            {sorted.length === 0
              ? 0
              : (page - 1) * rows + 1}
          </span>

          {" "}to{" "}

          <span className="font-semibold">
            {Math.min(
              page * rows,
              sorted.length
            )}
          </span>

          {" "}of{" "}

          <span className="font-semibold">
            {sorted.length}
          </span>

          {" "}records

        </div>

        <div className="flex items-center gap-2">

          <button
            disabled={page === 1}
            onClick={() =>
              setPage((p) => p - 1)
            }
            className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Previous
          </button>

          <span className="rounded-lg border bg-slate-100 px-4 py-2 font-medium">

            Page {page} of {totalPages}

          </span>

          <button
            disabled={page === totalPages}
            onClick={() =>
              setPage((p) => p + 1)
            }
            className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Next
          </button>

        </div>

      </div>

    </div>

  );
}