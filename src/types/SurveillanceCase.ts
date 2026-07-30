export interface SurveillanceCase {
  Case_ID: string;
  Disease: string;
  District: string;
  Upazila: string;
  Facility: string;
  Onset_Date: string;
  Report_Date: string;
  Age: number;
  Sex: string;
  Weight_kg: number;
  Case_Status: string;
  Hospitalized: string;
  Outcome: string;
  Latitude: number;
  Longitude: number;
  Reporting_Delay_Days: number;
}