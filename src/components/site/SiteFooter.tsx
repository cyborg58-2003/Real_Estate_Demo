import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Mail } from "lucide-react";
import { toast } from "sonner";

export function SiteFooter() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("Subscribed to Homestead Private Journal", {
      description: `Updates on off-market listings will be delivered to ${email}.`,
    });
    setEmail("");
  };

  return (
    <footer className="border-t border-border bg-panel/70 pt-16 pb-12 font-sans">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
          {/* Brand Col */}
          <div>
            <Link to="/" className="flex items-center gap-2.5 group">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                className="text-foreground"
                aria-hidden="true"
              >
                <path d="M3 11.5 12 4l9 7.5V21H3z" />
              </svg>
              <span className="font-serif text-2xl tracking-tight text-foreground font-light">
                Homestead
              </span>
            </Link>
            <p className="mt-4 max-w-sm font-serif text-sm leading-relaxed text-foreground/70">
              Curating exceptional architectural residences for design-conscious buyers and collectors worldwide.
            </p>
            <div className="mt-6 flex items-center gap-4 text-xs uppercase tracking-[0.2em] text-foreground/50">
              <span>San Francisco</span>
              <span>·</span>
              <span>Malibu</span>
              <span>·</span>
              <span>Aspen</span>
              <span>·</span>
              <span>Soho</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-sans text-[0.72rem] uppercase tracking-[0.2em] text-foreground/50 font-semibold">
              Explore
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-foreground/75">
              <li>
                <Link to="/properties" className="hover:text-foreground transition-colors">
                  All Properties
                </Link>
              </li>
              <li>
                <Link to="/agents" className="hover:text-foreground transition-colors">
                  Our Advisors
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-foreground transition-colors">
                  Architectural Philosophy
                </Link>
              </li>
              <li>
                <Link to="/valuation" className="hover:text-foreground transition-colors">
                  Sell Your Property
                </Link>
              </li>
              <li>
                <Link to="/saved" className="hover:text-foreground transition-colors">
                  Saved Homes
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Studio */}
          <div>
            <h4 className="font-sans text-[0.72rem] uppercase tracking-[0.2em] text-foreground/50 font-semibold">
              Advisory Studio
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-foreground/75">
              <li>114 Alder Lane, Sunset Valley, CA</li>
              <li className="pt-1">enquiries@homestead.estate</li>
              <li>+1 (415) 555-0148</li>
              <li className="pt-2 text-xs text-foreground/50">Mon–Fri: 9:00 AM – 6:00 PM PST</li>
            </ul>
          </div>

          {/* Journal Subscription */}
          <div>
            <h4 className="font-sans text-[0.72rem] uppercase tracking-[0.2em] text-foreground/50 font-semibold">
              Private Journal
            </h4>
            <p className="mt-4 text-xs text-foreground/70 leading-relaxed">
              Receive quiet off-market introductions, architectural insights, and market reports.
            </p>

            <form onSubmit={handleSubscribe} className="mt-4 relative">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-border bg-background py-3 pl-3.5 pr-10 text-xs text-foreground outline-none focus:border-foreground/40 placeholder:text-foreground/40"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 rounded p-1 text-foreground/70 hover:text-foreground"
                aria-label="Subscribe"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-8 text-xs text-foreground/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Homestead Estate Architecture Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-foreground cursor-pointer">Privacy Policy</span>
            <span className="hover:text-foreground cursor-pointer">Terms of Service</span>
            <span className="hover:text-foreground cursor-pointer">Equal Housing Opportunity</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
