import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Sparkles, Feather, Globe } from "lucide-react";

import { Header } from "@/components/site/Header";
import { SiteFooter } from "@/components/site/SiteFooter";
import heroImage from "@/assets/hero.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Homestead — Architectural Philosophy & Story" },
      {
        name: "description",
        content:
          "Learn about Homestead's founding principles, architectural standards, and private real estate advisory.",
      },
    ],
  }),
  component: AboutPage,
});

export function AboutPage() {
  return (
    <div className="grain min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-[1400px] px-5 pb-24 pt-12 sm:px-8 sm:pt-16">
        {/* Hero Section */}
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="font-sans text-[0.72rem] uppercase tracking-[0.2em] text-foreground/45 font-semibold">
              Our Studio & Story
            </span>
            <h1 className="mt-3 font-serif text-[clamp(2.5rem,7vw,4.2rem)] font-light leading-[1.02] tracking-tight text-foreground">
              Architecture as a Way of Living
            </h1>
            <div className="mt-6 h-px w-16 bg-foreground/30" />
            <p className="mt-6 font-serif text-lg leading-relaxed text-foreground/80 sm:text-xl">
              Homestead was founded on a simple conviction: that exceptional architecture shapes human experience. We do not list ordinary houses; we curate environments defined by light, material honesty, and spatial harmony.
            </p>
          </div>

          <div className="relative overflow-hidden border border-border">
            <img
              src={heroImage}
              alt="Homestead architectural residence"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>

        {/* Core Principles */}
        <section className="mt-24 border-t border-border pt-16">
          <span className="font-sans text-[0.72rem] uppercase tracking-[0.2em] text-foreground/45 font-semibold">
            Our Curation Pillars
          </span>
          <h2 className="mt-2 font-serif text-3xl font-light text-foreground sm:text-4xl">
            What Defines a Homestead Property
          </h2>

          <div className="mt-12 grid gap-8 sm:grid-cols-3 font-sans">
            <div className="border border-border bg-panel p-6 sm:p-8 space-y-4">
              <Feather className="h-8 w-8 text-primary" strokeWidth={1.2} />
              <h3 className="font-serif text-xl text-foreground">Structural Honesty</h3>
              <p className="text-sm text-foreground/70 leading-relaxed">
                Raw concrete, unlacquered brass, local limestone, and timber that age gracefully over decades without superficial ornament.
              </p>
            </div>

            <div className="border border-border bg-panel p-6 sm:p-8 space-y-4">
              <Sparkles className="h-8 w-8 text-primary" strokeWidth={1.2} />
              <h3 className="font-serif text-xl text-foreground">Light & Solar Geometry</h3>
              <p className="text-sm text-foreground/70 leading-relaxed">
                Floorplans configured around solar orientation, capturing morning clarity and western golden hour reflections.
              </p>
            </div>

            <div className="border border-border bg-panel p-6 sm:p-8 space-y-4">
              <Globe className="h-8 w-8 text-primary" strokeWidth={1.2} />
              <h3 className="font-serif text-xl text-foreground">Landscape Dialogue</h3>
              <p className="text-sm text-foreground/70 leading-relaxed">
                Residences designed in direct dialogue with their natural topography—whether meadow, alpine slope, or desert basin.
              </p>
            </div>
          </div>
        </section>

        {/* Press Highlights */}
        <section className="mt-24 border-t border-border pt-16">
          <span className="font-sans text-[0.72rem] uppercase tracking-[0.2em] text-foreground/45 font-semibold">
            In The Press
          </span>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <div className="border border-border p-6 bg-panel">
              <p className="font-serif text-lg italic text-foreground">
                "Homestead has redefined the luxury real estate market by treating homes as collectible works of modern art."
              </p>
              <span className="mt-4 block font-sans text-xs uppercase tracking-widest text-foreground/50">
                — Architectural Digest
              </span>
            </div>

            <div className="border border-border p-6 bg-panel">
              <p className="font-serif text-lg italic text-foreground">
                "Their private catalog features some of the most extraordinary modernist residences built in North America."
              </p>
              <span className="mt-4 block font-sans text-xs uppercase tracking-widest text-foreground/50">
                — Wallpaper* Magazine
              </span>
            </div>

            <div className="border border-border p-6 bg-panel">
              <p className="font-serif text-lg italic text-foreground">
                "A refreshing counter-weight to cookie-cutter luxury estates, focusing strictly on architectural merit."
              </p>
              <span className="mt-4 block font-sans text-xs uppercase tracking-widest text-foreground/50">
                — Dwell Design Journal
              </span>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-24 border border-border bg-panel p-10 sm:p-16 text-center">
          <h2 className="font-serif text-3xl font-light text-foreground sm:text-4xl">
            Looking to Buy or Sell an Architectural Residence?
          </h2>
          <p className="mt-3 max-w-xl mx-auto font-serif text-base text-foreground/75">
            Connect with our advisory studio for confidential consultations, private viewings, or off-market introductions.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/properties"
              className="bg-primary px-8 py-3.5 font-sans text-xs uppercase tracking-wider text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Explore Collection
            </Link>
            <Link
              to="/valuation"
              className="border border-border bg-background px-8 py-3.5 font-sans text-xs uppercase tracking-wider text-foreground hover:border-foreground/40 transition-colors"
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
