import type { ToolEntry } from "@tipos/tool";
import ToolLogo from "./ToolLogo";
import Badge from "@components/ui/Badge";
import { Shield } from "lucide-react";
import { COST_MODEL_LABELS, TOOL_TYPE_LABELS } from "@lib/constants";

interface ToolCardProps {
  tool: ToolEntry;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const { data } = tool;
  const costLabel = data.cost_model
    ? COST_MODEL_LABELS[data.cost_model] ?? data.cost_model
    : null;
  const typeLabel = TOOL_TYPE_LABELS[data.type] ?? data.type;

  return (
    <a
      href={`/herramientas/${data.slug}`}
      className="card group flex flex-col gap-4 p-5 no-underline"
    >
      {/* Cabecera: logo + nombre + tipo */}
      <div className="flex items-start gap-4">
        <div className="shrink-0">
          <ToolLogo name={data.name} logo={data.logo} size="md" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-base font-semibold text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors">
              {data.name}
            </h3>
            {data.market_rank && data.market_rank <= 3 && (
              <span className="inline-flex items-center rounded-full bg-amber-50 px-1.5 py-0.5 text-[10px] font-bold text-amber-600">
                #{data.market_rank}
              </span>
            )}
          </div>
          <p className="mt-1 line-clamp-2 text-sm text-[#6e6e73]">
            {data.description}
          </p>
        </div>
      </div>

      {/* Etiquetas */}
      <div className="flex flex-wrap items-center gap-1.5">
        <Badge label={typeLabel} color={data.type === "opensource" ? "green" : "blue"} />
        {costLabel && <Badge label={costLabel} color="gray" />}
        {data.company_size.length > 0 && (
          <Badge
            label={data.company_size.map((s: string) => s.charAt(0).toUpperCase() + s.slice(1)).join(" · ")}
            color="purple"
          />
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1">
        {data.tags.slice(0, 4).map((tag: string) => (
          <Badge key={tag} label={tag} color="gray" size="sm" />
        ))}
        {data.tags.length > 4 && (
          <Badge label={`+${data.tags.length - 4}`} color="gray" size="sm" />
        )}
      </div>

      {/* Footer: certificaciones */}
      {data.certifications.length > 0 && (
        <div className="flex items-center gap-1 text-[11px] text-[#aeaeb2]">
          <Shield size={12} />
          {data.certifications.slice(0, 3).join(", ")}
          {data.certifications.length > 3 && ` +${data.certifications.length - 3}`}
        </div>
      )}
    </a>
  );
}
