type KpiCardProps = {
  title: string;
  value: string | number;
};

export default function KpiCard({ title, value }: KpiCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition">
      <p className="text-gray-500 text-sm">{title}</p>

      <h2 className="text-3xl font-bold text-blue-700 mt-2">
        {value}
      </h2>
    </div>
  );
}