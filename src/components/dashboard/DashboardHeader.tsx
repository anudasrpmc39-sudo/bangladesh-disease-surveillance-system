import {
  Activity,
  Bell,
  CalendarClock,
  CircleCheckBig,
  Database,
  Hospital,
  MapPinned,
  Settings,
  UserCircle2,
} from "lucide-react";

type DashboardHeaderProps = {
  totalCases: number;
  totalDistricts: number;
  totalFacilities: number;
  username: string;
  lastUpdated: Date;
  systemStatus?: "Online" | "Offline" | "Updating";
};


export default function DashboardHeader({
  totalCases,
  totalDistricts,
  totalFacilities,
  username,
  lastUpdated,
  systemStatus = "Online",
}: DashboardHeaderProps) {
  const formattedDate = lastUpdated.toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const statusColor = {
    Online: "text-green-600",
    Offline: "text-red-600",
    Updating: "text-amber-600",
  };

  return (
    <header className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">

      {/* Top Section */}

      <div className="flex flex-col gap-6 bg-gradient-to-r from-emerald-700 via-green-700 to-teal-700 p-6 text-white lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}

        <div className="flex items-center gap-4">

          <div className="rounded-xl bg-white/20 p-3 backdrop-blur">

            <Activity size={36} />

          </div>

          <div>

            <h1 className="text-3xl font-bold tracking-wide">
              Bangladesh Disease Surveillance Information System
            </h1>

            <p className="mt-1 text-green-100">
              Ministry of Health & Family Welfare
            </p>

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center gap-5">

          <button className="rounded-full bg-white/10 p-2 transition hover:bg-white/20">
            <Bell size={22} />
          </button>

          <button className="rounded-full bg-white/10 p-2 transition hover:bg-white/20">
            <Settings size={22} />
          </button>

          <div className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 backdrop-blur">

            <UserCircle2 size={28} />

            <div>

              <p className="text-xs text-green-100">
                Logged in as
              </p>

              <p className="font-semibold">
                {username}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Bottom Information Bar */}

      <div className="grid grid-cols-2 gap-4 bg-slate-50 p-5 md:grid-cols-5">

        {/* Last Updated */}

        <div className="flex items-center gap-3">

          <CalendarClock className="text-emerald-600" size={22} />

          <div>

            <p className="text-xs uppercase tracking-wide text-slate-500">
              Last Updated
            </p>

            <p className="font-semibold text-slate-800">
              {formattedDate}
            </p>

          </div>

        </div>

        {/* Status */}

        <div className="flex items-center gap-3">

          <CircleCheckBig
            size={22}
            className={statusColor[systemStatus]}
          />

          <div>

            <p className="text-xs uppercase tracking-wide text-slate-500">
              System Status
            </p>

            <p className={`font-semibold ${statusColor[systemStatus]}`}>
              {systemStatus}
            </p>

          </div>

        </div>

        {/* Dataset */}

        <div className="flex items-center gap-3">

          <Database className="text-blue-600" size={22} />

          <div>

            <p className="text-xs uppercase tracking-wide text-slate-500">
              Dataset
            </p>

            <p className="font-semibold text-slate-800">
              {totalCases.toLocaleString()} Cases
            </p>

          </div>

        </div>

        {/* Districts */}

        <div className="flex items-center gap-3">

          <MapPinned className="text-orange-600" size={22} />

          <div>

            <p className="text-xs uppercase tracking-wide text-slate-500">
              Districts
            </p>

            <p className="font-semibold text-slate-800">
              {totalDistricts}
            </p>

          </div>

        </div>

        {/* Facilities */}

        <div className="flex items-center gap-3">

          <Hospital className="text-purple-600" size={22} />

          <div>

            <p className="text-xs uppercase tracking-wide text-slate-500">
              Facilities
            </p>

            <p className="font-semibold text-slate-800">
              {totalFacilities}
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}