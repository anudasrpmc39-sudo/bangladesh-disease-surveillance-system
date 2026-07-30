import type { SurveillanceCase } from "../types/SurveillanceCase";

export function getDiseases(data: SurveillanceCase[]) {
  return [...new Set(data.map((item) => item.Disease))].sort();
}

export function getDistricts(data: SurveillanceCase[]) {
  return [...new Set(data.map((item) => item.District))].sort();
}

export function getUpazilas(
  data: SurveillanceCase[],
  district: string
) {
  return [
    ...new Set(
      data
        .filter(
          (item) =>
            district === "All" ||
            item.District === district
        )
        .map((item) => item.Upazila)
    ),
  ].sort();
}

export function filterCases(
  data: SurveillanceCase[],
  disease: string,
  district: string,
  upazila: string
) {
  return data.filter((item) => {
    const diseaseMatch =
      disease === "All" ||
      item.Disease === disease;

    const districtMatch =
      district === "All" ||
      item.District === district;

    const upazilaMatch =
      upazila === "All" ||
      item.Upazila === upazila;

    return (
      diseaseMatch &&
      districtMatch &&
      upazilaMatch
    );
  });
}

