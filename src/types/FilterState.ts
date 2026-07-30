export interface FilterState {
  disease: string;
  district: string;
  upazila: string;

  startDate: string;
  endDate: string;

  hospitalized: string;
  outcome: string;
  sex: string;
  minAge: number | null;
  maxAge: number | null;
  facility: string;
}