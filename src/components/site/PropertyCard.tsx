import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Bookmark, Calendar, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";

import { formatPrice, specLine, type Property } from "@/data/properties";
import { useSavedProperties } from "@/hooks/useSavedProperties";
import { ScheduleTourModal } from "@/components/site/ScheduleTourModal";

export function PropertyCard({ property }: { property: Property }) {
  const { isSaved, toggleSave } = useSavedProperties();
  const saved = isSaved(property.slug);
  const [tourModalOpen, setTourModalOpen] = useState(false);

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSave(property.slug);
    if (!saved) {
      toast.success("Saved to favorites", {
        description: `${property.name} added to your saved collection.`,
      });
    } else {
      toast("Removed from favorites", {
        description: `${property.name} removed from your saved list.`,
      });
    }
  };

  return (
    <>
      <article className="group relative border border-border bg-panel flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-foreground/30 h-full">
        <Link to="/properties/$slug" params={{ slug: property.slug }} className="block flex-1">
          {/* Image Container */}
          <div className="relative overflow-hidden aspect-[4/3] w-full">
            <img
              src={property.image}
              alt={property.name}
              width={1200}
              height={912}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />

            {/* Status Badge */}
            <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-background/90 backdrop-blur-xs px-2 py-0.5 sm:px-3 sm:py-1 text-[0.62rem] sm:text-[0.68rem] font-sans uppercase tracking-[0.16em] text-foreground font-medium border border-border/80">
              {property.status}
            </div>

            {/* Bookmark Button */}
            <button
              type="button"
              onClick={handleBookmark}
              className={`absolute top-2 right-2 sm:top-3 sm:right-3 rounded-full p-2 sm:p-2.5 transition-all shadow-md ${
                saved
                  ? "bg-primary text-primary-foreground scale-110"
                  : "bg-background/85 text-foreground hover:bg-background hover:scale-105"
              }`}
              title={saved ? "Remove from saved" : "Save property"}
              aria-label="Save Property"
            >
              <Bookmark className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill={saved ? "currentColor" : "none"} />
            </button>
          </div>

          {/* Content Details */}
          <div className="px-3.5 pb-4 pt-3.5 sm:px-6 sm:pb-6 sm:pt-5">
            <div className="flex items-center justify-between gap-1">
              <span className="font-sans text-[0.65rem] sm:text-[0.7rem] uppercase tracking-[0.15em] text-foreground/45 truncate">
                {property.location}
              </span>
              <span className="font-sans text-[0.68rem] sm:text-[0.72rem] text-foreground/50 shrink-0">
                ${property.pricePerSqft}/sqft
              </span>
            </div>

            <h3 className="mt-1.5 font-serif text-lg sm:text-2xl font-light text-foreground group-hover:text-primary transition-colors flex items-center justify-between leading-tight">
              <span className="truncate">{property.name}</span>
              <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all text-foreground/50 shrink-0" />
            </h3>

            <p className="mt-1 font-sans text-[0.75rem] sm:text-[0.85rem] text-foreground/60 truncate">
              {specLine(property)}
            </p>

            <div className="mt-3 flex items-baseline justify-between border-t border-border/70 pt-2.5 sm:pt-4">
              <p className="font-serif text-lg sm:text-2xl font-semibold text-foreground">
                {formatPrice(property.price)}
              </p>
              <span className="font-sans text-[0.68rem] sm:text-xs text-foreground/45 italic">{property.type}</span>
            </div>
          </div>
        </Link>

        {/* Quick Actions Footer */}
        <div className="border-t border-border px-3.5 py-2.5 sm:px-5 sm:py-3 bg-background/50 flex items-center justify-between">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setTourModalOpen(true);
            }}
            className="flex items-center gap-1 font-sans text-[0.72rem] sm:text-xs text-foreground/75 hover:text-foreground transition-colors"
          >
            <Calendar className="h-3.5 w-3.5 text-primary shrink-0" />
            <span className="hidden xs:inline">Tour</span>
            <span className="xs:hidden">Tour</span>
          </button>

          <Link
            to="/properties/$slug"
            params={{ slug: property.slug }}
            className="font-sans text-[0.72rem] sm:text-xs font-medium text-foreground hover:underline"
          >
            Details
          </Link>
        </div>
      </article>

      {/* Tour Modal */}
      <ScheduleTourModal
        property={property}
        isOpen={tourModalOpen}
        onClose={() => setTourModalOpen(false)}
      />
    </>
  );
}
