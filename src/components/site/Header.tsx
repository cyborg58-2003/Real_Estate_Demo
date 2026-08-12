import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Bookmark, Menu, X } from "lucide-react";
import { useSavedProperties } from "@/hooks/useSavedProperties";

const NAV = [
  { label: "Home", to: "/" },
  { label: "Properties", to: "/properties" },
  { label: "Advisors", to: "/agents" },
  { label: "Studio", to: "/about" },
  { label: "Valuation", to: "/valuation" },
] as const;

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { count: savedCount } = useSavedProperties();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <header className="w-full bg-background border-b border-border/60 sticky top-0 z-40 backdrop-blur-md bg-background/95 transition-all duration-300">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-4 sm:px-8 sm:py-4">
        {/* Brand Logo with micro hover scale */}
        <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group">
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            className="text-foreground transition-transform duration-300 group-hover:scale-110"
            aria-hidden="true"
          >
            <path d="M3 11.5 12 4l9 7.5V21H3z" />
            <path d="M9 21v-6h6v6" />
          </svg>
          <div className="flex flex-col">
            <span className="font-serif text-xl tracking-tight text-foreground sm:text-2xl font-light">
              Homestead
            </span>
            <span className="text-[0.62rem] uppercase tracking-[0.25em] text-foreground/45 -mt-1 hidden sm:inline">
              Luxury Estates
            </span>
          </div>
        </Link>

        {/* Desktop Nav with Animated Underline */}
        <nav className="hidden items-center gap-7 lg:gap-9 md:flex">
          {NAV.map((item) => {
            const isActive = currentPath === item.to;
            return (
              <Link
                key={item.label}
                to={item.to}
                className={`font-sans text-[0.88rem] transition-all duration-200 relative py-1 group/nav ${
                  isActive ? "text-foreground font-medium" : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 right-0 h-0.5 bg-foreground transition-all duration-300 ease-out origin-left ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover/nav:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Saved Homes Badge with pulse */}
          <Link
            to="/saved"
            className="flex items-center gap-1.5 border border-border px-3 py-2 text-xs font-sans text-foreground/80 hover:text-foreground hover:border-foreground/40 transition-all duration-200 active:scale-95"
            title="View saved homes"
          >
            <Bookmark className="h-4 w-4 text-primary transition-transform duration-200 hover:scale-110" />
            <span className="hidden sm:inline">Saved</span>
            {savedCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[0.7rem] font-semibold text-primary-foreground animate-scale-up">
                {savedCount}
              </span>
            )}
          </Link>

          <Link
            to="/contact"
            className="hidden sm:inline-block bg-primary px-5 py-2.5 font-sans text-[0.82rem] text-primary-foreground transition-all duration-200 hover:opacity-90 hover:shadow-md active:scale-95"
          >
            Get in Touch
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-foreground p-1 transition-transform duration-200 active:scale-90"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6 animate-scale-up" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-panel px-5 py-6 space-y-4 animate-in slide-in-from-top-3 fade-in duration-200">
          <nav className="flex flex-col space-y-3 font-sans text-base">
            {NAV.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-foreground/80 hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/saved"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-foreground/80 hover:text-foreground flex items-center justify-between"
            >
              <span>Saved Properties</span>
              {savedCount > 0 && (
                <span className="bg-primary text-primary-foreground px-2 py-0.5 text-xs rounded-full">
                  {savedCount}
                </span>
              )}
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 block w-full text-center bg-primary py-3 font-sans text-sm text-primary-foreground active:scale-98 transition-transform"
            >
              Get in Touch
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
