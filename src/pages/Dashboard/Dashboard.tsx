import KpiCard from "../../components/cards/KpiCard";
import { dashboardData } from "../../data/dashboardData";

export default function Dashboard() {
  return (
    <>
      <h1>Disease Surveillance Dashboard</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
          flexWrap: "wrap",
        }}
      >
        {dashboardData.map((item) => (
          <KpiCard
            key={item.title}
            title={item.title}
            value={item.value}
          />
        ))}
      </div>
    </>
  );
}