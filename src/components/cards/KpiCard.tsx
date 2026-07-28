type KpiCardProps = {
  title: string;
  value: string | number;
};

export default function KpiCard({ title, value }: KpiCardProps) {
  return (
    <div
      style={{
        background: "white",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "20px",
        minWidth: "180px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h3>{title}</h3>
      <h1>{value}</h1>
    </div>
  );
}