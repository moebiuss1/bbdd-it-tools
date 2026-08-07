interface BadgeProps {
  label: string;
  color?: "blue" | "green" | "red" | "orange" | "purple" | "gray" | "amber" | "teal" | "indigo" | "rose" | "cyan" | "lime" | "slate" | "zinc" | "fuchsia" | "emerald" | "sky" | "violet" | "stone";
  size?: "sm" | "md";
  className?: string;
}

const COLOR_MAP: Record<string, string> = {
  blue: "bg-blue-50 text-blue-700",
  green: "bg-green-50 text-green-700",
  red: "bg-red-50 text-red-700",
  orange: "bg-orange-50 text-orange-700",
  purple: "bg-purple-50 text-purple-700",
  gray: "bg-gray-100 text-gray-600",
  amber: "bg-amber-50 text-amber-700",
  teal: "bg-teal-50 text-teal-700",
  indigo: "bg-indigo-50 text-indigo-700",
  rose: "bg-rose-50 text-rose-700",
  cyan: "bg-cyan-50 text-cyan-700",
  lime: "bg-lime-50 text-lime-700",
  slate: "bg-slate-100 text-slate-600",
  zinc: "bg-zinc-100 text-zinc-600",
  fuchsia: "bg-fuchsia-50 text-fuchsia-700",
  emerald: "bg-emerald-50 text-emerald-700",
  sky: "bg-sky-50 text-sky-700",
  violet: "bg-violet-50 text-violet-700",
  stone: "bg-stone-100 text-stone-600",
};

const SIZE_MAP = {
  sm: "px-2 py-0.5 text-[11px]",
  md: "px-3 py-1 text-xs",
};

export default function Badge({
  label,
  color = "gray",
  size = "sm",
  className = "",
}: BadgeProps) {
  const baseColor = COLOR_MAP[color] ?? COLOR_MAP.gray;
  const baseSize = SIZE_MAP[size];

  return (
    <span
      className={`chip inline-flex items-center font-medium ${baseColor} ${baseSize} ${className}`}
    >
      {label}
    </span>
  );
}
