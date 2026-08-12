import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Grid, List, Map, ArrowUpDown, Bookmark, RefreshCw, Square, Columns2 } from "lucide-react";

import { Header } from "@/components/site/Header";
import { SiteFooter } from "@/components/site/SiteFooter";
import { PropertyCard } from "@/components/site/PropertyCard";
import { MobileGridToggle } from "@/components/site/MobileGridToggle";
import { RevealOnScroll } from "@/components/site/RevealOnScroll";
import { PropertyMap } from "@/components/site/PropertyMap";
import { PropertyCompare } from "@/components/site/PropertyCompare";
import { SearchPanel, EMPTY_FILTERS, type Filters } from "@/components/site/SearchPanel";
import { PROPERTIES, PRICE_RANGES, formatPrice, specLine } from "@/data/properties";
import { useSavedProperties } from "@/hooks/useSavedProperties";

export const Route = createFileRoute("/properties/")({
  head: () => ({
    meta: [
      { title: "Browse Luxury Architectural Properties — Homestead" },
      {
        name: "description",
        content:
          "Search and explore curated contemporary homes, villas, estates, and penthouses for sale.",
      },
    ],
  }),
  component: PropertiesCatalog,
});

type SortOption = "featured" | "price-asc" | "price-desc" | "newest" | "sqft";

function PropertiesCatalog() {
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [sort, setSort] = useState<SortOption>("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list" | "map">("grid");
  const [mobileCols, setMobileCols] = useState<1 | 2>(1);
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const { savedProperties, toggleSave } = useSavedProperties();

  const filtered = useMemo(() => {
    const range = PRICE_RANGES.find((r) => r.label === filters.price);
    return PROPERTIES.filter((property) => {
      if (
        filters.searchQuery &&
        !property.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
        !property.location.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
        !property.city.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
        !property.architect.toLowerCase().includes(filters.searchQuery.toLowerCase())
      ) {
        return false;
      }
      if (filters.location && property.location !== filters.location) return false;
      if (filters.type && property.type !== filters.type) return false;
      if (range && (property.price < range.min || property.price > range.max)) return false;
      return true;
    });
  }, [filters]);

  const sorted = useMemo(() => {
    const list = [...filtered];
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "newest") list.sort((a, b) => b.year - a.year);
    if (sort === "sqft") list.sort((a, b) => b.sqft - a.sqft);
    return list;
  }, [filtered, sort]);

  const isFiltered = Boolean(
    filters.searchQuery || filters.location || filters.type || filters.price
  );

  return (
    <div className="grain min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-[1400px] px-5 pb-24 pt-10 sm:px-8 sm:pt-12">
        {/* Page Title Header */}
        <RevealOnScroll variant="slide-left" delay={100}>
          <div className="border-b border-border pb-8">
            <span className="font-sans text-[0.72rem] uppercase tracking-[0.2em] text-foreground/45">
              Curated Directory
            </span>
            <h1 className="mt-2 font-serif text-[clamp(2.2rem,6vw,3.8rem)] font-light leading-[1.05] tracking-tight text-foreground">
              Architectural Residences
            </h1>
            <p className="mt-3 max-w-xl font-serif text-base text-foreground/70 sm:text-lg">
              Discover minimalist homes, waterfront compounds, and desert modern sanctuaries curated by our design team.
            </p>
          </div>
        </RevealOnScroll>

        {/* Search & Filter Bar */}
        <RevealOnScroll variant="fade-up" delay={200}>
          <div className="mt-8">
            <SearchPanel filters={filters} onChange={setFilters} onSearch={() => {}} />
          </div>
        </RevealOnScroll>

        {/* Controls Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
          <div className="flex items-center gap-3 font-sans text-sm text-foreground/70">
            <span>
              Showing <strong className="text-foreground">{sorted.length}</strong> of {PROPERTIES.length} properties
            </span>
            {isFiltered && (
              <button
                type="button"
                onClick={() => setFilters(EMPTY_FILTERS)}
                className="text-xs text-primary underline hover:opacity-80"
              >
                Clear all filters
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {/* Compare Drawer Trigger */}
            {savedProperties.length > 0 && (
              <button
                type="button"
                onClick={() => setCompareModalOpen(true)}
                className="flex items-center gap-1.5 border border-border bg-panel px-3.5 py-2 font-sans text-xs text-foreground hover:border-foreground/40 transition-colors"
              >
                <Bookmark className="h-3.5 w-3.5 text-primary" />
                <span>Compare Saved ({savedProperties.length})</span>
              </button>
            )}

            {/* Sort Selector */}
            <div className="flex items-center gap-2 border border-border bg-panel px-3 py-1.5 font-sans text-xs">
              <ArrowUpDown className="h-3.5 w-3.5 text-foreground/50" />
              <span className="text-foreground/50 hidden xs:inline">Sort:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="bg-transparent text-foreground font-medium outline-none cursor-pointer text-xs"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Year Built: Newest</option>
                <option value="sqft">Interior Size: Largest</option>
              </select>
            </div>

            {/* Mobile Column Grid Toggle (1 Card vs 2 Cards on Mobile) */}
            {viewMode === "grid" && (
              <MobileGridToggle cols={mobileCols} onChange={setMobileCols} />
            )}

            {/* View Mode Toggle (Grid, List, Map) */}
            <div className="flex items-center border border-border bg-panel p-1">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`p-1.5 transition-colors ${
                  viewMode === "grid" ? "bg-primary text-primary-foreground" : "text-foreground/60 hover:text-foreground"
                }`}
                title="Grid View"
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`p-1.5 transition-colors ${
                  viewMode === "list" ? "bg-primary text-primary-foreground" : "text-foreground/60 hover:text-foreground"
                }`}
                title="List View"
              >
                <List className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("map")}
                className={`p-1.5 transition-colors ${
                  viewMode === "map" ? "bg-primary text-primary-foreground" : "text-foreground/60 hover:text-foreground"
                }`}
                title="Map View"
              >
                <Map className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Content Display */}
        {sorted.length === 0 ? (
          <div className="mt-12 border border-border bg-panel p-12 text-center font-serif text-lg text-foreground/60">
            <p>No properties match your current search criteria.</p>
            <button
              type="button"
              onClick={() => setFilters(EMPTY_FILTERS)}
              className="mt-4 inline-flex items-center gap-2 bg-primary px-6 py-2.5 font-sans text-xs text-primary-foreground hover:opacity-90"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Reset All Filters
            </button>
          </div>
        ) : viewMode === "map" ? (
          <div className="mt-8">
            <PropertyMap properties={sorted} />
          </div>
        ) : viewMode === "list" ? (
          <div className="mt-8 space-y-6">
            {sorted.map((property) => (
              <div
                key={property.slug}
                className="border border-border bg-panel p-4 sm:p-6 flex flex-col md:flex-row gap-6 items-center justify-between hover:shadow-lg transition-all"
              >
                <img
                  src={property.image}
                  alt={property.name}
                  className="h-48 w-full md:w-72 object-cover border border-border shrink-0"
                />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase tracking-widest text-foreground/45">{property.status}</span>
                    <span className="text-xs text-foreground/45">· {property.location}</span>
                  </div>
                  <h3 className="font-serif text-2xl text-foreground font-light">{property.name}</h3>
                  <p className="font-sans text-xs text-foreground/60">{specLine(property)}</p>
                  <p className="font-serif text-sm text-foreground/75 line-clamp-2">{property.summary}</p>
                </div>
                <div className="w-full md:w-auto text-right border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6 shrink-0 flex flex-col justify-between h-full">
                  <div>
                    <span className="font-serif text-2xl font-semibold text-foreground">
                      {formatPrice(property.price)}
                    </span>
                    <p className="text-xs text-foreground/50">${property.pricePerSqft} / sqft</p>
                  </div>
                  <a
                    href={`/properties/${property.slug}`}
                    className="mt-4 block w-full md:w-auto bg-primary px-6 py-2.5 font-sans text-xs text-primary-foreground text-center hover:opacity-90"
                  >
                    View Details
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={`mt-9 grid ${mobileCols === 2 ? "grid-cols-2 gap-3" : "grid-cols-1 gap-7"} sm:grid-cols-2 sm:gap-8 lg:grid-cols-3`}>
            {sorted.map((property) => (
              <PropertyCard key={property.slug} property={property} />
            ))}
          </div>
        )}
      </main>

      <PropertyCompare
        properties={savedProperties}
        isOpen={compareModalOpen}
        onClose={() => setCompareModalOpen(false)}
        onRemove={(slug) => toggleSave(slug)}
      />

      <SiteFooter />
    </div>
  );
}
