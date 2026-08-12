import { Square, Grid2x2 } from "lucide-react";

type Props = {
  cols: 1 | 2;
  onChange: (cols: 1 | 2) => void;
};

export function MobileGridToggle({ cols, onChange }: Props) {
  return (
    <div className="inline-flex items-center border border-border/90 bg-panel p-0.5 sm:hidden">
      {/* 1 Card per row (Single Full Width) */}
      <button
        type="button"
        onClick={() => onChange(1)}
        className={`p-2 transition-all duration-200 ${
          cols === 1
            ? "bg-primary text-primary-foreground shadow-xs"
            : "text-foreground/50 hover:text-foreground hover:bg-background"
        }`}
        title="1 Card per Row"
        aria-label="Single Card View"
      >
        <Square className="h-4 w-4" strokeWidth={1.8} />
      </button>

      {/* 2 Cards per row (Compact Grid) */}
      <button
        type="button"
        onClick={() => onChange(2)}
        className={`p-2 transition-all duration-200 ${
          cols === 2
            ? "bg-primary text-primary-foreground shadow-xs"
            : "text-foreground/50 hover:text-foreground hover:bg-background"
        }`}
        title="2 Cards per Row"
        aria-label="Two Cards Grid View"
      >
        <Grid2x2 className="h-4 w-4" strokeWidth={1.8} />
      </button>
    </div>
  );
}
