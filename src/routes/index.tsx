import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Compass, ShieldCheck, Award, Sparkles, Building2, Layers, Square, Columns2 } from "lucide-react";
import { useMemo, useRef, useState } from "react";

import { Header } from "@/components/site/Header";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SearchPanel, EMPTY_FILTERS, type Filters } from "@/components/site/SearchPanel";
import { PropertyCard } from "@/components/site/PropertyCard";
import { MobileGridToggle } from "@/components/site/MobileGridToggle";
import { PROPERTIES, PRICE_RANGES } from "@/data/properties";
import heroImage from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Homestead — Luxury Architectural Homes for Sale" },
      {
        name: "description",
        content:
          "Homestead curates exceptional contemporary homes, modernist villas, and private estates in prime locations.",
      },
      { property: "og:title", content: "Homestead — Luxury Architectural Homes" },
      {
        property: "og:description",
        content:
          "Discover exceptional properties in prime locations, curated for the way you live.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

export function Index() {
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [mobileCols, setMobileCols] = useState<1 | 2>(1);
  const resultsRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const range = PRICE_RANGES.find((r) => r.label === filters.price);
    return PROPERTIES.filter((property) => {
      if (
        filters.searchQuery &&
        !property.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
        !property.location.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
        !property.city.toLowerCase().includes(filters.searchQuery.toLowerCase())
      ) {
        return false;
      }
      if (filters.location && property.location !== filters.location) return false;
      if (filters.type && property.type !== filters.type) return false;
      if (range && (property.price < range.min || property.price > range.max)) return false;
      return true;
    });
  }, [filters]);

  const isFiltered = Boolean(
    filters.searchQuery || filters.location || filters.type || filters.price
  );

  return (
    <div className="grain min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative">
          <div className="relative h-[65vh] min-h-[460px] w-full sm:h-[72vh] sm:min-h-[540px] lg:h-[78vh]">
            <img
              src={heroImage}
              alt="Contemporary architectural home with glass walls and reflecting pool at golden hour"
              width={1920}
              height={1088}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,16,12,0.76)_0%,rgba(20,16,12,0.40)_55%,rgba(20,16,12,0.15)_100%)]" />

            <div className="absolute inset-0">
              <div className="mx-auto flex h-full max-w-[1400px] items-center px-5 sm:px-8">
                <div className="max-w-xl pb-16 sm:pb-24">
                  <span className="font-sans text-[0.72rem] uppercase tracking-[0.25em] text-panel/80 font-medium">
                    Private Real Estate Advisory
                  </span>
                  <h1 className="mt-2 font-serif text-[clamp(2.5rem,9.5vw,5.2rem)] font-light leading-[1] tracking-[-0.01em] text-panel sm:leading-[0.98]">
                    Find Your
                    <br />
                    Architectural Home
                  </h1>
                  <div className="mt-6 h-px w-14 bg-panel/70 sm:mt-8 sm:w-16" />
                  <p className="mt-5 max-w-sm font-serif text-[1.02rem] leading-relaxed text-panel/90 sm:mt-7 sm:text-lg">
                    Curated modernist residences, waterfront compounds, and hillside sanctuaries designed for living.
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Search Panel overlay inside Hero (Mobile & Desktop) */}
            <div className="absolute inset-x-0 bottom-0 translate-y-1/2 px-3 sm:px-6 md:px-8 z-20">
              <div className="mx-auto max-w-[1180px]">
                <SearchPanel
                  filters={filters}
                  onChange={setFilters}
                  onSearch={() =>
                    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Strip */}
        <section className="mt-20 md:mt-28 border-y border-border bg-panel py-8">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8 grid grid-cols-2 gap-6 sm:grid-cols-4 font-sans text-center">
            <div>
              <span className="font-serif text-3xl sm:text-4xl text-foreground font-light">$1.15B+</span>
              <p className="text-[0.7rem] uppercase tracking-[0.16em] text-foreground/50 mt-1">Transactions</p>
            </div>
            <div>
              <span className="font-serif text-3xl sm:text-4xl text-foreground font-light">100%</span>
              <p className="text-[0.7rem] uppercase tracking-[0.16em] text-foreground/50 mt-1">Vetted Architecture</p>
            </div>
            <div>
              <span className="font-serif text-3xl sm:text-4xl text-foreground font-light">99.4%</span>
              <p className="text-[0.7rem] uppercase tracking-[0.16em] text-foreground/50 mt-1">Client Satisfaction</p>
            </div>
            <div>
              <span className="font-serif text-3xl sm:text-4xl text-foreground font-light">4</span>
              <p className="text-[0.7rem] uppercase tracking-[0.16em] text-foreground/50 mt-1">Regional Studios</p>
            </div>
          </div>
        </section>

        {/* Featured Listings Section */}
        <section
          ref={resultsRef}
          className="mx-auto max-w-[1400px] scroll-mt-8 px-5 pb-20 pt-16 sm:px-8 sm:pb-28"
        >
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <span className="font-sans text-[0.72rem] uppercase tracking-[0.2em] text-foreground/45">
                Curated Collection
              </span>
              <h2 className="mt-1 font-serif text-[clamp(1.85rem,6vw,2.9rem)] font-light tracking-tight text-foreground">
                {isFiltered ? "Matching Properties" : "Featured Residences"}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <MobileGridToggle cols={mobileCols} onChange={setMobileCols} />

              <Link
                to="/properties"
                className="group flex items-center gap-2 font-sans text-[0.85rem] text-foreground/70 transition-colors hover:text-foreground"
              >
                <span>View All ({PROPERTIES.length})</span>
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  strokeWidth={1.4}
                />
              </Link>
            </div>
          </div>

          {results.length > 0 ? (
            <div className={`mt-9 grid ${mobileCols === 2 ? "grid-cols-2 gap-3" : "grid-cols-1 gap-7"} sm:grid-cols-2 sm:gap-8 lg:grid-cols-3`}>
              {results.slice(0, 6).map((property) => (
                <PropertyCard key={property.slug} property={property} />
              ))}
            </div>
          ) : (
            <div className="mt-10 border border-border px-6 py-12 text-center font-serif text-lg text-foreground/60">
              No properties match this search filter. Try clearing your filters or selecting a different location.
            </div>
          )}
        </section>

        {/* Lifestyle Collections Section */}
        <section className="border-t border-border bg-panel py-20">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
            <div className="text-center max-w-xl mx-auto">
              <span className="font-sans text-[0.72rem] uppercase tracking-[0.2em] text-foreground/45">
                Explore by Environment
              </span>
              <h2 className="mt-2 font-serif text-3xl font-light text-foreground sm:text-4xl">
                Homes Tailored to Your Setting
              </h2>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Link to="/properties" className="group relative overflow-hidden border border-border aspect-[4/5] block">
                <img
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"
                  alt="Coastal Waterfront"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                <div className="absolute bottom-6 left-6 text-panel">
                  <span className="text-[0.68rem] uppercase tracking-widest text-panel/75">Environment</span>
                  <h3 className="font-serif text-2xl font-light">Waterfront Compounds</h3>
                </div>
              </Link>

              <Link to="/properties" className="group relative overflow-hidden border border-border aspect-[4/5] block">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                  alt="Desert Modernism"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                <div className="absolute bottom-6 left-6 text-panel">
                  <span className="text-[0.68rem] uppercase tracking-widest text-panel/75">Environment</span>
                  <h3 className="font-serif text-2xl font-light">Desert Modernism</h3>
                </div>
              </Link>

              <Link to="/properties" className="group relative overflow-hidden border border-border aspect-[4/5] block">
                <img
                  src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80"
                  alt="Alpine Retreats"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                <div className="absolute bottom-6 left-6 text-panel">
                  <span className="text-[0.68rem] uppercase tracking-widest text-panel/75">Environment</span>
                  <h3 className="font-serif text-2xl font-light">Alpine Retreats</h3>
                </div>
              </Link>

              <Link to="/properties" className="group relative overflow-hidden border border-border aspect-[4/5] block">
                <img
                  src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
                  alt="Urban Penthouses"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                <div className="absolute bottom-6 left-6 text-panel">
                  <span className="text-[0.68rem] uppercase tracking-widest text-panel/75">Environment</span>
                  <h3 className="font-serif text-2xl font-light">Sky Penthouses</h3>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Sell Your Property CTA */}
        <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8">
          <div className="border border-border bg-panel p-10 sm:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="font-sans text-[0.72rem] uppercase tracking-[0.2em] text-foreground/45 font-semibold">
                Homestead Valuation Studio
              </span>
              <h2 className="mt-2 font-serif text-3xl font-light text-foreground sm:text-4xl">
                Considering Selling Your Property?
              </h2>
              <p className="mt-3 font-serif text-base text-foreground/75 leading-relaxed">
                Our advisors provide confidential architectural valuations, off-market introductions, and global collector outreach.
              </p>
            </div>

            <Link
              to="/valuation"
              className="bg-primary px-8 py-4 font-sans text-xs uppercase tracking-wider text-primary-foreground hover:opacity-90 transition-opacity shrink-0"
            >
              Request Home Valuation
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
