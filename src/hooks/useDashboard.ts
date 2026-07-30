import { useEffect, useState } from "react";
import { loadSurveillanceData } from "../services/csvService";
import { calculateDashboard } from "../services/statisticsService";

export function useDashboard() {
  const [stats, setStats] = useState<any>();

  useEffect(() => {
    async function load() {
      const data = await loadSurveillanceData();
      setStats(calculateDashboard(data));
    }

    load();
  }, []);

  return stats;
}