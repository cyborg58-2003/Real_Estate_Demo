import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Bookmark, Trash2, SlidersHorizontal, ArrowRight, Square, Columns2 } from "lucide-react";
import { toast } from "sonner";

import { Header } from "@/components/site/Header";
import { SiteFooter } from "@/components/site/SiteFooter";
import { PropertyCard } from "@/components/site/PropertyCard";
import { PropertyCompare } from "@/components/site/PropertyCompare";
import { MobileGridToggle } from "@/components/site/MobileGridToggle";
import { RevealOnScroll } from "@/components/site/RevealOnScroll";
import { useSavedProperties } from "@/hooks/useSavedProperties";

export const Route = createFileRoute("/saved")({
  head: () => ({
    meta: [
      { title: "Saved Homes & Collection — Homestead" },
      {
        name: "description",
        content:
          "View your bookmarked luxury architectural properties and compare specifications side-by-side.",
      },
    ],
  }),
  component: SavedPropertiesPage,
});

function SavedPropertiesPage() {
  const { savedProperties, toggleSave, clearAll } = useSavedProperties();
  const [compareOpen, setCompareOpen] = useState(false);
  const [mobileCols, setMobileCols] = useState<1 | 2>(1);

  const handleClear = () => {
    if (savedProperties.length === 0) return;
    clearAll();
    toast("Saved collection cleared");
  };

  return (
    <div className="grain min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-[1400px] px-5 pb-24 pt-12 sm:px-8 sm:pt-16">
        {/* Header */}
        <RevealOnScroll variant="slide-left" delay={100}>
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-8">
            <div>
              <span className="font-sans text-[0.72rem] uppercase tracking-[0.2em] text-foreground/45">
                Personal Collection
              </span>
              <h1 className="mt-2 font-serif text-[clamp(2.2rem,6.5vw,3.8rem)] font-light leading-[1.02] tracking-tight text-foreground">
                Saved Residences ({savedProperties.length})
              </h1>
            </div>

            {savedProperties.length > 0 && (
              <div className="flex flex-wrap items-center gap-3">
                <MobileGridToggle cols={mobileCols} onChange={setMobileCols} />

                <button
                  type="button"
                  onClick={() => setCompareOpen(true)}
                  className="flex items-center gap-1.5 bg-primary px-5 py-2.5 font-sans text-xs text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  <span>Compare Side-by-Side</span>
                </button>

                <button
                  type="button"
                  onClick={handleClear}
                  className="flex items-center gap-1.5 border border-border bg-panel px-4 py-2.5 font-sans text-xs text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Clear All</span>
                </button>
              </div>
            )}
          </div>
        </RevealOnScroll>

        {/* Content */}
        {savedProperties.length === 0 ? (
          <RevealOnScroll variant="fade-up" delay={200}>
            <div className="mt-16 border border-border bg-panel p-16 text-center">
              <Bookmark className="mx-auto h-12 w-12 text-foreground/30" strokeWidth={1} />
              <h3 className="mt-4 font-serif text-2xl text-foreground font-light">Your saved list is empty</h3>
              <p className="mt-2 max-w-sm mx-auto font-serif text-sm text-foreground/60">
                Bookmark luxury architectural properties while browsing to build your personal collection and compare specs.
              </p>
              <Link
                to="/properties"
                className="mt-8 inline-flex items-center gap-2 bg-primary px-8 py-3.5 font-sans text-xs uppercase tracking-wider text-primary-foreground hover:opacity-90"
              >
                <span>Explore Properties</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </RevealOnScroll>
        ) : (
          <RevealOnScroll variant="fade-up" delay={200}>
            <div className={`mt-10 grid ${mobileCols === 2 ? "grid-cols-2 gap-3" : "grid-cols-1 gap-7"} sm:grid-cols-2 sm:gap-8 lg:grid-cols-3`}>
              {savedProperties.map((property) => (
                <PropertyCard key={property.slug} property={property} />
              ))}
            </div>
          </RevealOnScroll>
        )}
      </main>

      <PropertyCompare
        properties={savedProperties}
        isOpen={compareOpen}
        onClose={() => setCompareOpen(false)}
        onRemove={(slug) => toggleSave(slug)}
      />

      <SiteFooter />
    </div>
  );
}
