export function calculateDashboard(data: any[]) {
  return {
    totalCases: data.length,
    districts: new Set(data.map((d) => d.district)).size,
    diseases: new Set(data.map((d) => d.disease)).size,
    deaths: data.filter((d) => d.outcome === "Death").length,
  };
}

export function getDiseaseDistribution(data: any[]) {
  const diseaseMap: Record<string, number> = {};

  data.forEach((item) => {
    diseaseMap[item.Disease] = (diseaseMap[item.Disease] || 0) + 1;
  });

  return Object.entries(diseaseMap).map(([name, value]) => ({
    name,
    value,
  }));
}

export function getMonthlyTrend(data: any[]) {
  const monthMap: Record<string, number> = {};

  data.forEach((item) => {
    if (!item.Onset_Date) return;

    const date = new Date(item.Onset_Date);

    if (isNaN(date.getTime())) return;

    const month = date.toLocaleString("default", {
      month: "short",
      year: "2-digit",
    });

    monthMap[month] = (monthMap[month] || 0) + 1;
  });

  return Object.entries(monthMap).map(([month, cases]) => ({
    month,
    cases,
  }));
}

export function getAgeDistribution(data: any[]) {
  const ageGroups = {
    "0-4": 0,
    "5-14": 0,
    "15-24": 0,
    "25-44": 0,
    "45-64": 0,
    "65+": 0,
  };

  data.forEach((item) => {
    const age = Number(item.Age);

    if (age >= 0 && age <= 4) {
      ageGroups["0-4"]++;
    } else if (age <= 14) {
      ageGroups["5-14"]++;
    } else if (age <= 24) {
      ageGroups["15-24"]++;
    } else if (age <= 44) {
      ageGroups["25-44"]++;
    } else if (age <= 64) {
      ageGroups["45-64"]++;
    } else {
      ageGroups["65+"]++;
    }
  });

  return Object.entries(ageGroups).map(([ageGroup, cases]) => ({
    ageGroup,
    cases,
  }));
}

export function getSexDistribution(data: any[]) {
  const sexMap: Record<string, number> = {};

  data.forEach((item) => {
    const sex = item.Sex || "Unknown";
    sexMap[sex] = (sexMap[sex] || 0) + 1;
  });

  return Object.entries(sexMap).map(([name, value]) => ({
    name,
    value,
  }));
}