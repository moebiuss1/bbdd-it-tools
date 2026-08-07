import { SearchX } from "lucide-react";

interface EmptyStateProps {
  icon?: "search" | "tools" | "general";
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const ICONS = {
  search: SearchX,
  tools: SearchX,
  general: SearchX,
};

export default function EmptyState({
  icon = "general",
  title,
  description,
  action,
}: EmptyStateProps) {
  const Icon = ICONS[icon];

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f5f5f7]">
        <Icon className="h-8 w-8 text-[#aeaeb2]" />
      </div>
      <h3 className="mb-1 text-lg font-semibold text-[#1d1d1f]">{title}</h3>
      {description && (
        <p className="mb-4 max-w-sm text-sm text-[#6e6e73]">{description}</p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="rounded-full bg-[#0071e3] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0077ed]"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
