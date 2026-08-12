import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Bookmark, Calendar, Check, Compass, Phone, Mail, Maximize2, ShieldCheck, Share2 } from "lucide-react";
import { toast } from "sonner";

import { Header } from "@/components/site/Header";
import { SiteFooter } from "@/components/site/SiteFooter";
import { PropertyCard } from "@/components/site/PropertyCard";
import { ScheduleTourModal } from "@/components/site/ScheduleTourModal";
import { MortgageCalculator } from "@/components/site/MortgageCalculator";
import { ImageLightbox } from "@/components/site/ImageLightbox";
import { formatPrice, getProperty, specLine, PROPERTIES } from "@/data/properties";
import { getAgent } from "@/data/agents";
import { useSavedProperties } from "@/hooks/useSavedProperties";

export const Route = createFileRoute("/properties/$slug")({
  loader: ({ params }) => {
    const property = getProperty(params.slug);
    if (!property) throw notFound();
    const agent = getAgent(property.agentId);
    return { property, agent };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Property unavailable — Homestead" }, { name: "robots", content: "noindex" }],
      };
    }
    const { property } = loaderData;
    const description = `${property.name} in ${property.location} — ${specLine(property)}, offered at ${formatPrice(property.price)}.`;
    return {
      meta: [
        { title: `${property.name} — Homestead Luxury Real Estate` },
        { name: "description", content: description },
        { property: "og:title", content: `${property.name} — Homestead` },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: PropertyDetail,
});

function PropertyDetail() {
  const { property, agent } = Route.useLoaderData();
  const { isSaved, toggleSave } = useSavedProperties();
  const saved = isSaved(property.slug);

  const [tourModalOpen, setTourModalOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"overview" | "features" | "floorplan">("overview");

  const specs = [
    { label: "Bedrooms", value: String(property.beds) },
    { label: "Bathrooms", value: String(property.baths) },
    { label: "Interior", value: `${property.sqft.toLocaleString("en-US")} sqft` },
    { label: "Price / SqFt", value: `$${property.pricePerSqft}` },
    { label: "Lot Size", value: property.lot },
    { label: "Year Built", value: String(property.year) },
    { label: "Architect", value: property.architect },
    { label: "Property Type", value: property.type },
  ];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.name,
        text: property.summary,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    }
  };

  const handleSaveToggle = () => {
    toggleSave(property.slug);
    if (!saved) {
      toast.success("Saved to favorites", { description: `${property.name} added to saved collection.` });
    } else {
      toast("Removed from favorites");
    }
  };

  const related = PROPERTIES.filter((p) => p.slug !== property.slug).slice(0, 3);

  return (
    <div className="grain min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-[1400px] px-5 pb-24 pt-6 sm:px-8 sm:pt-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 font-sans text-[0.82rem] text-foreground/60 transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.4} />
            Back to all properties
          </Link>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleShare}
              className="flex items-center gap-1.5 border border-border px-3 py-1.5 font-sans text-xs text-foreground/75 hover:border-foreground/40 transition-colors"
            >
              <Share2 className="h-3.5 w-3.5" />
              <span>Share</span>
            </button>
            <button
              type="button"
              onClick={handleSaveToggle}
              className={`flex items-center gap-1.5 border px-3 py-1.5 font-sans text-xs transition-colors ${
                saved
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-foreground/75 hover:border-foreground/40"
              }`}
            >
              <Bookmark className="h-3.5 w-3.5" fill={saved ? "currentColor" : "none"} />
              <span>{saved ? "Saved" : "Save Home"}</span>
            </button>
          </div>
        </div>

        {/* Property Header */}
        <header className="mt-7 flex flex-wrap items-end justify-between gap-4 border-b border-border pb-7">
          <div>
            <div className="flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.18em] text-foreground/45">
              <span className="font-semibold text-primary">{property.status}</span>
              <span>·</span>
              <span>{property.location}</span>
              <span>·</span>
              <span>{property.city}</span>
            </div>
            <h1 className="mt-2 font-serif text-[clamp(2.2rem,6.5vw,3.8rem)] font-light leading-[1.05] tracking-tight text-foreground">
              {property.name}
            </h1>
            <p className="mt-1 font-serif text-base text-foreground/70 italic max-w-2xl">{property.tagline}</p>
          </div>

          <div className="text-right">
            <p className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">
              {formatPrice(property.price)}
            </p>
            <p className="text-xs text-foreground/50 font-sans mt-0.5">
              Est. ${Math.round(property.price * 0.0055).toLocaleString()}/mo mortgage
            </p>
          </div>
        </header>

        {/* Gallery Grid */}
        <div className="mt-8 relative group">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="sm:col-span-2 relative overflow-hidden cursor-pointer" onClick={() => { setLightboxIndex(0); setLightboxOpen(true); }}>
              <img
                src={property.gallery[0]}
                alt={property.name}
                className="aspect-[16/10] w-full object-cover transition-transform duration-500 hover:scale-[1.01]"
              />
            </div>
            <div className="grid gap-3">
              {property.gallery.slice(1, 3).map((img, idx) => (
                <div key={img + idx} className="relative overflow-hidden cursor-pointer" onClick={() => { setLightboxIndex(idx + 1); setLightboxOpen(true); }}>
                  <img
                    src={img}
                    alt={`${property.name} view ${idx + 2}`}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => { setLightboxIndex(0); setLightboxOpen(true); }}
            className="absolute bottom-4 right-4 flex items-center gap-2 bg-background/90 border border-border px-4 py-2 font-sans text-xs text-foreground backdrop-blur-xs hover:bg-background transition-colors"
          >
            <Maximize2 className="h-4 w-4" />
            <span>View All Photos ({property.gallery.length})</span>
          </button>
        </div>

        {/* Main Content Layout */}
        <div className="mt-12 grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          {/* Left Main Column */}
          <div className="space-y-12">
            {/* Tabs Bar */}
            <div className="flex border-b border-border font-sans text-sm">
              <button
                type="button"
                onClick={() => setActiveTab("overview")}
                className={`pb-3 px-4 font-medium transition-colors border-b-2 -mb-px ${
                  activeTab === "overview" ? "border-foreground text-foreground" : "border-transparent text-foreground/50 hover:text-foreground"
                }`}
              >
                Overview & Story
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("features")}
                className={`pb-3 px-4 font-medium transition-colors border-b-2 -mb-px ${
                  activeTab === "features" ? "border-foreground text-foreground" : "border-transparent text-foreground/50 hover:text-foreground"
                }`}
              >
                Architectural Details
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("floorplan")}
                className={`pb-3 px-4 font-medium transition-colors border-b-2 -mb-px ${
                  activeTab === "floorplan" ? "border-foreground text-foreground" : "border-transparent text-foreground/50 hover:text-foreground"
                }`}
              >
                Floor Plan
              </button>
            </div>

            {/* Tab Contents */}
            {activeTab === "overview" && (
              <div className="space-y-8 animate-in fade-in duration-200">
                <p className="font-serif text-[1.15rem] leading-relaxed text-foreground/85 sm:text-[1.25rem]">
                  {property.description}
                </p>

                {/* Key Amenities */}
                <div>
                  <h3 className="font-sans text-[0.72rem] uppercase tracking-[0.2em] text-foreground/45 font-semibold">
                    Signature Amenities
                  </h3>
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {property.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center gap-2 border border-border bg-panel p-3 font-sans text-xs text-foreground">
                        <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "features" && (
              <div className="animate-in fade-in duration-200">
                <h3 className="font-sans text-[0.72rem] uppercase tracking-[0.2em] text-foreground/45 font-semibold">
                  Architectural Specifications
                </h3>
                <ul className="mt-4 divide-y divide-border border-y border-border">
                  {property.features.map((feature) => (
                    <li key={feature} className="py-4 font-sans text-sm text-foreground/80 flex items-start gap-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "floorplan" && (
              <div className="animate-in fade-in duration-200 space-y-4">
                <h3 className="font-sans text-[0.72rem] uppercase tracking-[0.2em] text-foreground/45 font-semibold">
                  Architectural Floor Plan
                </h3>
                <div className="border border-border p-4 bg-panel">
                  <img
                    src={property.floorplan}
                    alt={`${property.name} floorplan`}
                    className="w-full object-contain max-h-[500px]"
                  />
                  <p className="mt-2 text-center text-xs text-foreground/50">
                    Schematic representation. Dimensions are approximate.
                  </p>
                </div>
              </div>
            )}

            {/* Mortgage Calculator Integration */}
            <div className="pt-6">
              <MortgageCalculator homePrice={property.price} />
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
            {/* Specs Card */}
            <div className="border border-border bg-panel p-6 sm:p-8">
              <h2 className="font-sans text-[0.72rem] uppercase tracking-[0.2em] text-foreground/45 font-semibold">
                Property Specifications
              </h2>
              <dl className="mt-5 divide-y divide-border">
                {specs.map((spec) => (
                  <div key={spec.label} className="flex items-baseline justify-between py-3">
                    <dt className="font-sans text-[0.85rem] text-foreground/55">{spec.label}</dt>
                    <dd className="font-serif text-base text-foreground font-medium">{spec.value}</dd>
                  </div>
                ))}
              </dl>

              <button
                type="button"
                onClick={() => setTourModalOpen(true)}
                className="mt-6 flex items-center justify-center gap-2 w-full bg-primary px-6 py-4 font-sans text-xs uppercase tracking-wider text-primary-foreground transition-opacity hover:opacity-90 font-medium"
              >
                <Calendar className="h-4 w-4" />
                <span>Arrange a Private Viewing</span>
              </button>
            </div>

            {/* Agent Contact Card */}
            {agent && (
              <div className="border border-border bg-panel p-6">
                <span className="font-sans text-[0.7rem] uppercase tracking-[0.2em] text-foreground/45">
                  Exclusive Listing Advisor
                </span>
                <div className="mt-4 flex items-center gap-4">
                  <img
                    src={agent.image}
                    alt={agent.name}
                    className="h-16 w-16 rounded-full object-cover border border-border"
                  />
                  <div>
                    <h4 className="font-serif text-lg text-foreground font-light">{agent.name}</h4>
                    <p className="text-xs text-foreground/60 font-sans">{agent.title}</p>
                    <p className="text-[0.72rem] text-primary font-sans mt-0.5">{agent.salesVolume} Sales Volume</p>
                  </div>
                </div>

                <p className="mt-4 text-xs font-serif text-foreground/75 leading-relaxed italic">
                  "{agent.bio}"
                </p>

                <div className="mt-6 space-y-2 font-sans text-xs">
                  <a
                    href={`tel:${agent.phone}`}
                    className="flex items-center gap-2 border border-border p-2.5 text-foreground/80 hover:text-foreground hover:border-foreground/40 transition-colors"
                  >
                    <Phone className="h-3.5 w-3.5 text-primary" />
                    <span>Call {agent.phone}</span>
                  </a>
                  <a
                    href={`mailto:${agent.email}`}
                    className="flex items-center gap-2 border border-border p-2.5 text-foreground/80 hover:text-foreground hover:border-foreground/40 transition-colors"
                  >
                    <Mail className="h-3.5 w-3.5 text-primary" />
                    <span>Email {agent.email}</span>
                  </a>
                </div>
              </div>
            )}
          </aside>
        </div>

        {/* Related Properties */}
        <section className="mt-20 border-t border-border pt-16">
          <h2 className="font-serif text-2xl font-light text-foreground sm:text-3xl">
            Similar Architectural Homes
          </h2>
          <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((rel) => (
              <PropertyCard key={rel.slug} property={rel} />
            ))}
          </div>
        </section>
      </main>

      {/* Modals */}
      <ScheduleTourModal
        property={property}
        isOpen={tourModalOpen}
        onClose={() => setTourModalOpen(false)}
      />

      <ImageLightbox
        images={property.gallery}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onSelectIndex={(idx) => setLightboxIndex(idx)}
      />

      <SiteFooter />
    </div>
  );
}
