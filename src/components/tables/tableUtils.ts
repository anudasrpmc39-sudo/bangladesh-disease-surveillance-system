import type { SurveillanceCase } from "../../types/SurveillanceCase";

export type SortField =
  | "Case_ID"
  | "Disease"
  | "District"
  | "Upazila"
  | "Age"
  | "Sex"
  | "Case_Status"
  | "Outcome";

export function filterCases(
  data: SurveillanceCase[],
  searchTerm: string
): SurveillanceCase[] {
  if (!searchTerm.trim()) return data;

  const keyword = searchTerm.toLowerCase();

  return data.filter((item) => {
    return (
      item.Case_ID.toLowerCase().includes(keyword) ||
      item.Disease.toLowerCase().includes(keyword) ||
      item.District.toLowerCase().includes(keyword) ||
      item.Upazila.toLowerCase().includes(keyword)
    );
  });
}

export function sortCases(
  data: SurveillanceCase[],
  field: SortField,
  ascending: boolean
): SurveillanceCase[] {
  const sorted = [...data];

  sorted.sort((a, b) => {
    const valueA = a[field];
    const valueB = b[field];

    if (
      typeof valueA === "number" &&
      typeof valueB === "number"
    ) {
      return ascending
        ? valueA - valueB
        : valueB - valueA;
    }

    return ascending
      ? String(valueA).localeCompare(String(valueB))
      : String(valueB).localeCompare(String(valueA));
  });

  return sorted;
}