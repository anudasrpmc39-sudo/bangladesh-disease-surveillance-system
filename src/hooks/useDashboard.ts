import { useEffect, useState } from "react";
import { loadCSV } from "../services/csvService";
import { calculateDashboard } from "../services/statisticsService";

export function useDashboard() {
  const [stats, setStats] = useState<any>();

  useEffect(() => {
    async function load() {
      const data = await loadCSV("/data/diarrhea_surveillance.csv");
      setStats(calculateDashboard(data));
    }

    load();
  }, []);

  return stats;
}