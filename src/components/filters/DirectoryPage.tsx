import { useState, useMemo, useCallback } from "react";
import type { ToolEntry, Category } from "@tipos/tool";
import { sortTools } from "@lib/tools";
import ToolCard from "@components/tools/ToolCard";
import EmptyState from "@components/ui/EmptyState";
import { X } from "lucide-react";

interface Props {
  tools: ToolEntry[];
  categories: Category[];
}

export default function DirectoryPage({ tools, categories }: Props) {
  // Estado de filtros desde URL params
  const [searchParams, setSearchParams] = useState<URLSearchParams>(() => {
    if (typeof window !== "undefined") {
      return new URLSearchParams(window.location.search);
    }
    return new URLSearchParams();
  });

  const query = searchParams.get("q") ?? "";
  const activeCategory = searchParams.get("category") ?? "";
  const activeType = searchParams.get("type") ?? "";
  const activeTags = searchParams.getAll("tag");
  const activeSizes = searchParams.getAll("size");
  const sortBy = (searchParams.get("sort") as "rank" | "name" | "updated") ?? "rank";

  // Sincronizar URL
  const updateParams = useCallback((fn: (p: URLSearchParams) => void) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      fn(next);
      // Limpiar keys vacías
      for (const [k, v] of next.entries()) {
        if (!v) next.delete(k);
      }
      const qs = next.toString();
      const url = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
      window.history.replaceState(null, "", url);
      return next;
    });
  }, []);

  // Filtrado
  const filtered = useMemo(() => {
    let result = tools;

    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (t) =>
          t.data.name.toLowerCase().includes(q) ||
          t.data.description.toLowerCase().includes(q) ||
          t.data.tags.some((tag: string) => tag.toLowerCase().includes(q)) ||
          t.data.category.toLowerCase().includes(q)
      );
    }

    if (activeCategory) {
      result = result.filter((t) => t.data.category === activeCategory);
    }

    if (activeType) {
      result = result.filter((t) => t.data.type === activeType);
    }

    if (activeTags.length > 0) {
      result = result.filter((t) =>
        activeTags.some((tag) => t.data.tags.includes(tag))
      );
    }

    if (activeSizes.length > 0) {
      result = result.filter((t) =>
        activeSizes.some((s) => t.data.company_size.includes(s as "pequeña" | "mediana" | "grande"))
      );
    }

    return sortTools(result, sortBy);
  }, [tools, query, activeCategory, activeType, activeTags, activeSizes, sortBy]);

  const hasFilters = activeCategory || activeType || activeTags.length > 0 || activeSizes.length > 0;

  return (
    <div>
      {/* Barra de filtros */}
      <div className="mb-6 space-y-4">
        {/* Categorías */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => updateParams((p) => p.delete("category"))}
            className={`chip ${!activeCategory ? "bg-[#0071e3] text-white" : "bg-[#f5f5f7] text-[#6e6e73] hover:bg-[#e8e8ed]"}`}
          >
            Todas
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() =>
                updateParams((p) => {
                  if (activeCategory === cat.id) {
                    p.delete("category");
                  } else {
                    p.set("category", cat.id);
                  }
                })
              }
              className={`chip ${activeCategory === cat.id ? "bg-[#0071e3] text-white" : "bg-[#f5f5f7] text-[#6e6e73] hover:bg-[#e8e8ed]"}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Filtros secundarios */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Tipo */}
          <select
            value={activeType}
            onChange={(e) =>
              updateParams((p) => {
                if (e.target.value) p.set("type", e.target.value);
                else p.delete("type");
              })
            }
            className="rounded-full border border-[#d2d2d7] bg-white px-3 py-1.5 text-sm text-[#1d1d1f] focus:border-[#0071e3] focus:outline-none"
          >
            <option value="">Todos los tipos</option>
            <option value="comercial">Comercial</option>
            <option value="opensource">Open Source</option>
          </select>

          {/* Tamaño empresa */}
          {["pequeña", "mediana", "grande"].map((s) => (
            <button
              key={s}
              onClick={() =>
                updateParams((p) => {
                  const current = p.getAll("size");
                  p.delete("size");
                  if (current.includes(s)) {
                    current.filter((x) => x !== s).forEach((x) => p.append("size", x));
                  } else {
                    [...current, s].forEach((x) => p.append("size", x));
                  }
                })
              }
              className={`chip ${activeSizes.includes(s) ? "bg-[#0071e3] text-white" : "bg-[#f5f5f7] text-[#6e6e73] hover:bg-[#e8e8ed]"}`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}

          {/* Ordenar */}
          <select
            value={sortBy}
            onChange={(e) =>
              updateParams((p) => {
                if (e.target.value !== "rank") p.set("sort", e.target.value);
                else p.delete("sort");
              })
            }
            className="ml-auto rounded-full border border-[#d2d2d7] bg-white px-3 py-1.5 text-sm text-[#1d1d1f] focus:border-[#0071e3] focus:outline-none"
          >
            <option value="rank">Por ranking</option>
            <option value="name">Alfabético</option>
            <option value="updated">Más reciente</option>
          </select>
        </div>

        {/* Barra de estado */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#6e6e73]">
            {filtered.length} herramienta{filtered.length !== 1 ? "s" : ""}
            {hasFilters && " · filtros activos"}
          </span>
          {hasFilters && (
            <button
              onClick={() =>
                setSearchParams(new URLSearchParams())
              }
              className="flex items-center gap-1 text-[#0071e3] hover:underline"
            >
              <X size={14} />
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      {/* Resultados */}
      {filtered.length === 0 ? (
        <EmptyState
          icon="search"
          title="Sin resultados"
          description="Prueba a cambiar o limpiar los filtros."
          action={
            hasFilters
              ? {
                  label: "Limpiar filtros",
                  onClick: () => setSearchParams(new URLSearchParams()),
                }
              : undefined
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      )}
    </div>
  );
}
