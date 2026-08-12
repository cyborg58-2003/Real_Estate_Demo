import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { MapPin, X, ArrowRight, Layers } from "lucide-react";
import { formatPrice, type Property } from "@/data/properties";

type Props = {
  properties: Property[];
  selectedSlug?: string;
  onSelectProperty?: (slug: string) => void;
};

export function PropertyMap({ properties, selectedSlug, onSelectProperty }: Props) {
  const [activeSlug, setActiveSlug] = useState<string | null>(selectedSlug || null);
  const activeProperty = properties.find((p) => p.slug === activeSlug);

  return (
    <div className="relative h-[600px] w-full border border-border bg-panel overflow-hidden">
      {/* Map Graphic Overlay */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#14100c_1px,transparent_1px)] [background-size:20px_20px]" />

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-30 border-t border-b border-border flex justify-around">
        <div className="border-r border-border h-full w-1/4" />
        <div className="border-r border-border h-full w-1/4" />
        <div className="border-r border-border h-full w-1/4" />
      </div>

      {/* Map Control Bar */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-background/90 border border-border px-3.5 py-2 font-sans text-xs text-foreground backdrop-blur-xs">
        <Layers className="h-4 w-4 text-foreground/60" />
        <span>Homestead Interactive Map ({properties.length} Properties)</span>
      </div>

      {/* Interactive Map Pins */}
      <div className="relative h-full w-full">
        {properties.map((p, index) => {
          // Normalize lat/lng to stylized percentage points for demo map visual layout
          // California / NY coordinates spread visually
          const topPercent = 20 + ((index * 23) % 60);
          const leftPercent = 15 + ((index * 27) % 70);
          const isSelected = p.slug === activeSlug;

          return (
            <div
              key={p.slug}
              style={{ top: `${topPercent}%`, left: `${leftPercent}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
            >
              <button
                type="button"
                onClick={() => {
                  setActiveSlug(p.slug);
                  if (onSelectProperty) onSelectProperty(p.slug);
                }}
                className={`group flex items-center gap-1.5 px-3 py-1.5 font-sans text-xs font-medium shadow-lg transition-all duration-300 ${
                  isSelected
                    ? "bg-foreground text-background scale-110 ring-2 ring-primary ring-offset-2 z-30"
                    : "bg-panel text-foreground border border-border hover:border-foreground hover:scale-105"
                }`}
              >
                <MapPin className={`h-3.5 w-3.5 ${isSelected ? "text-primary-foreground" : "text-primary"}`} />
                <span>{formatPrice(p.price)}</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Property Popup Card */}
      {activeProperty && (
        <div className="absolute bottom-6 left-6 right-6 z-30 mx-auto max-w-sm border border-border bg-panel p-4 shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
          <button
            type="button"
            onClick={() => setActiveSlug(null)}
            className="absolute top-3 right-3 text-foreground/50 hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex gap-4">
            <img
              src={activeProperty.image}
              alt={activeProperty.name}
              className="h-20 w-24 object-cover border border-border shrink-0"
            />
            <div>
              <span className="font-sans text-[0.65rem] uppercase tracking-[0.15em] text-foreground/45">
                {activeProperty.location}
              </span>
              <h4 className="font-serif text-lg text-foreground leading-tight">{activeProperty.name}</h4>
              <p className="mt-1 font-serif text-sm font-semibold text-foreground">
                {formatPrice(activeProperty.price)}
              </p>
              <p className="text-[0.75rem] text-foreground/55">{activeProperty.beds} beds · {activeProperty.baths} baths</p>
            </div>
          </div>

          <div className="mt-3 border-t border-border pt-3">
            <Link
              to="/properties/$slug"
              params={{ slug: activeProperty.slug }}
              className="inline-flex items-center justify-between w-full font-sans text-xs text-foreground font-medium hover:text-primary transition-colors"
            >
              <span>View Property Details</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
