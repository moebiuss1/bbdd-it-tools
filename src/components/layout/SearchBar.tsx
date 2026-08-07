import { useCallback, useEffect, useRef } from "react";
import { Search } from "lucide-react";

interface Props {
  className?: string;
  compact?: boolean;
}

export default function SearchBar({ className = "", compact = false }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = inputRef.current?.value.trim();
    if (q) {
      window.location.href = `/herramientas?q=${encodeURIComponent(q)}`;
    }
  }, []);

  // Atajo de teclado: Cmd+K / Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#aeaeb2]"
        size={16}
      />
      <input
        ref={inputRef}
        type="search"
        name="q"
        placeholder="Buscar herramienta…"
        aria-label="Buscar herramientas"
        className="w-full rounded-full border border-[#d2d2d7] bg-[#f5f5f7] py-2 pl-9 pr-4 text-sm text-[#1d1d1f] placeholder:text-[#aeaeb2] transition-all focus:border-[#0071e3] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20"
      />
      {!compact && (
        <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded bg-[#e5e5ea] px-1.5 py-0.5 text-[10px] text-[#aeaeb2] sm:inline">
          ⌘K
        </kbd>
      )}
    </form>
  );
}
