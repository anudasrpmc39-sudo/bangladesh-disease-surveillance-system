import { ReactNode } from "react";
import { MoreVertical } from "lucide-react";

type ChartCardProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  action?: ReactNode;
};

export default function ChartCard({
  title,
  subtitle,
  children,
  action,
}: ChartCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-md transition-shadow hover:shadow-lg">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">

        <div>

          <h2 className="text-lg font-semibold text-slate-800">
            {title}
          </h2>

          {subtitle && (
            <p className="mt-1 text-sm text-slate-500">
              {subtitle}
            </p>
          )}

        </div>

        {action ? (
          action
        ) : (
          <button
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
            title="More options"
          >
            <MoreVertical size={18} />
          </button>
        )}

      </div>

      {/* Chart Body */}
      <div className="h-[360px] p-5">
        {children}
      </div>

    </div>
  );
}