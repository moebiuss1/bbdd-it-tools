import { useState } from "react";

interface ToolLogoProps {
  name: string;
  logo?: string;
  size?: "sm" | "md" | "lg";
}

const SIZE_MAP = {
  sm: "h-8 w-8 text-xs",
  md: "h-12 w-12 text-lg",
  lg: "h-20 w-20 text-2xl",
};

/** Genera un color determinista basado en el nombre */
function nameToColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colors = [
    "bg-blue-100 text-blue-600",
    "bg-indigo-100 text-indigo-600",
    "bg-purple-100 text-purple-600",
    "bg-teal-100 text-teal-600",
    "bg-emerald-100 text-emerald-600",
    "bg-rose-100 text-rose-600",
    "bg-amber-100 text-amber-600",
    "bg-cyan-100 text-cyan-600",
  ];
  return colors[Math.abs(hash) % colors.length];
}

export default function ToolLogo({
  name,
  logo,
  size = "md",
}: ToolLogoProps) {
  const [imgError, setImgError] = useState(false);
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  const sizeClass = SIZE_MAP[size];

  if (logo && !imgError) {
    return (
      <img
        src={logo}
        alt={`Logo de ${name}`}
        className={`${sizeClass} rounded-lg object-contain`}
        loading="lazy"
        onError={() => setImgError(true)}
      />
    );
  }

  // Monograma fallback
  return (
    <div
      className={`${sizeClass} ${nameToColor(name)} flex items-center justify-center rounded-lg font-semibold`}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}
