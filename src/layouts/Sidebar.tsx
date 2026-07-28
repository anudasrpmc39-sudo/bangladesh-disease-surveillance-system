export default function Sidebar() {
  return (
    <div className="w-64 bg-slate-900 text-white h-screen p-6">
      <h1 className="text-2xl font-bold mb-8">
        BDSS
      </h1>

      <ul className="space-y-4">
        <li>Dashboard</li>
        <li>Diseases</li>
        <li>Patients</li>
        <li>Laboratory</li>
        <li>GIS</li>
        <li>Analytics</li>
        <li>Reports</li>
      </ul>
    </div>
  );
}