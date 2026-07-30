import Papa from "papaparse";
import type { SurveillanceCase } from "../types/SurveillanceCase";

export async function loadSurveillanceData(): Promise<SurveillanceCase[]> {
const response = await fetch(
  `${import.meta.env.BASE_URL}data/Bangladesh_Integrated_Disease_Surveillance_Synthetic_Dataset_Jashore_2025_2026.csv`
);

  if (!response.ok) {
    throw new Error(`Failed to load CSV. HTTP ${response.status}`);
  }

  const csvText = await response.text();

  return new Promise((resolve, reject) => {
    Papa.parse<SurveillanceCase>(csvText, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,

      complete: (results) => {
        resolve(results.data);
      },

      error: (error: Error) => {
        reject(error);
      },
    });
  });
}