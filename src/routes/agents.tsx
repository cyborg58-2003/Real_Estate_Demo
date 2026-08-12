import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, Mail, Award, CheckCircle2, MessageSquare } from "lucide-react";
import { toast } from "sonner";

import { Header } from "@/components/site/Header";
import { SiteFooter } from "@/components/site/SiteFooter";
import { RevealOnScroll } from "@/components/site/RevealOnScroll";
import { AGENTS, type Agent } from "@/data/agents";
import { PROPERTIES } from "@/data/properties";

export const Route = createFileRoute("/agents")({
  head: () => ({
    meta: [
      { title: "Our Advisors & Architectural Specialists — Homestead" },
      {
        name: "description",
        content:
          "Meet the Homestead team of senior advisors specializing in modernist homes, waterfront estates, and private sales.",
      },
    ],
  }),
  component: AgentsPage,
});

function AgentsPage() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [contactMessage, setContactMessage] = useState("");
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderEmail || !selectedAgent) {
      toast.error("Please provide your name and email.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(`Inquiry sent to ${selectedAgent.name}`, {
        description: `Thank you, ${senderName}. ${selectedAgent.name} will contact you shortly.`,
      });
      setSelectedAgent(null);
      setSenderName("");
      setSenderEmail("");
      setContactMessage("");
    }, 600);
  };

  return (
    <div className="grain min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-[1400px] px-5 pb-24 pt-12 sm:px-8 sm:pt-16">
        {/* Header */}
        <RevealOnScroll variant="slide-left" delay={100}>
          <div className="max-w-2xl border-b border-border pb-8">
            <span className="font-sans text-[0.72rem] uppercase tracking-[0.2em] text-foreground/45">
              Advisory Team
            </span>
            <h1 className="mt-2 font-serif text-[clamp(2.3rem,7vw,4rem)] font-light leading-[1.02] tracking-tight text-foreground">
              Architectural Advisors
            </h1>
            <p className="mt-4 font-serif text-lg leading-relaxed text-foreground/70">
              Our specialists possess deep technical knowledge in architectural history, structural design, and private real estate transactions.
            </p>
          </div>
        </RevealOnScroll>

        {/* Stats Row */}
        <RevealOnScroll variant="fade-up" delay={200}>
          <div className="mt-10 grid grid-cols-2 gap-4 border-b border-border pb-10 sm:grid-cols-4 font-sans">
            <div className="border border-border bg-panel p-5 text-center">
              <span className="font-serif text-3xl font-light text-foreground">$1.15B+</span>
              <p className="mt-1 text-xs text-foreground/55 uppercase tracking-wider">Transaction Volume</p>
            </div>
            <div className="border border-border bg-panel p-5 text-center">
              <span className="font-serif text-3xl font-light text-foreground">99.4%</span>
              <p className="mt-1 text-xs text-foreground/55 uppercase tracking-wider">Client Satisfaction</p>
            </div>
            <div className="border border-border bg-panel p-5 text-center">
              <span className="font-serif text-3xl font-light text-foreground">15+</span>
              <p className="mt-1 text-xs text-foreground/55 uppercase tracking-wider">Design Awards</p>
            </div>
            <div className="border border-border bg-panel p-5 text-center">
              <span className="font-serif text-3xl font-light text-foreground">4</span>
              <p className="mt-1 text-xs text-foreground/55 uppercase tracking-wider">Regional Studios</p>
            </div>
          </div>
        </RevealOnScroll>

        {/* Agents Grid */}
        <RevealOnScroll variant="fade-up" delay={300}>
          <div className="mt-14 grid gap-10 md:grid-cols-2">
          {AGENTS.map((agent) => {
            const agentListings = PROPERTIES.filter((p) => p.agentId === agent.id);

            return (
              <div
                key={agent.id}
                className="border border-border bg-panel p-6 sm:p-8 flex flex-col justify-between hover:shadow-xl transition-all"
              >
                <div>
                  <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                    <img
                      src={agent.image}
                      alt={agent.name}
                      className="h-28 w-28 rounded-full object-cover border-2 border-border shrink-0"
                    />
                    <div>
                      <span className="font-sans text-[0.68rem] uppercase tracking-[0.18em] text-foreground/45">
                        {agent.location}
                      </span>
                      <h3 className="font-serif text-2xl font-light text-foreground">{agent.name}</h3>
                      <p className="font-sans text-xs text-foreground/60">{agent.title}</p>
                      <p className="mt-1 font-serif text-sm font-semibold text-primary">
                        {agent.salesVolume} Sales Volume
                      </p>
                    </div>
                  </div>

                  <p className="mt-6 font-serif text-sm text-foreground/80 leading-relaxed italic">
                    "{agent.bio}"
                  </p>

                  <div className="mt-6">
                    <span className="font-sans text-[0.7rem] uppercase tracking-[0.16em] text-foreground/45 font-semibold">
                      Specialties
                    </span>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {agent.specialties.map((spec) => (
                        <span
                          key={spec}
                          className="border border-border bg-background px-3 py-1 font-sans text-xs text-foreground/75"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {agentListings.length > 0 && (
                    <div className="mt-6 border-t border-border pt-4">
                      <span className="font-sans text-xs text-foreground/50">
                        Active Listings ({agentListings.length}):
                      </span>
                      <div className="mt-2 space-y-1">
                        {agentListings.map((p) => (
                          <Link
                            key={p.slug}
                            to="/properties/$slug"
                            params={{ slug: p.slug }}
                            className="block font-serif text-sm text-foreground hover:text-primary transition-colors truncate"
                          >
                            · {p.name} ({p.location})
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-8 border-t border-border pt-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex gap-3 text-xs font-sans">
                    <a
                      href={`tel:${agent.phone}`}
                      className="flex items-center gap-1 text-foreground/70 hover:text-foreground"
                    >
                      <Phone className="h-3.5 w-3.5 text-primary" />
                      <span>{agent.phone}</span>
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedAgent(agent)}
                    className="flex items-center gap-1.5 bg-primary px-5 py-2 font-sans text-xs text-primary-foreground hover:opacity-90 transition-opacity"
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span>Contact Advisor</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </RevealOnScroll>
    </main>

      {/* Inquiry Modal */}
      {selectedAgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-md border border-border bg-panel p-6 shadow-2xl">
            <h3 className="font-serif text-2xl text-foreground">Inquire with {selectedAgent.name}</h3>
            <p className="mt-1 text-xs text-foreground/60 font-sans">{selectedAgent.title}</p>

            <form onSubmit={handleInquirySubmit} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-foreground/50">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Full name"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="mt-1 w-full border border-border bg-background p-2.5 text-sm text-foreground outline-none focus:border-foreground/40"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-foreground/50">Your Email *</label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  className="mt-1 w-full border border-border bg-background p-2.5 text-sm text-foreground outline-none focus:border-foreground/40"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-foreground/50">Message</label>
                <textarea
                  rows={3}
                  placeholder={`Hi ${selectedAgent.name}, I am interested in exploring property options.`}
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  className="mt-1 w-full resize-none border border-border bg-background p-2.5 text-sm text-foreground outline-none focus:border-foreground/40"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedAgent(null)}
                  className="w-1/2 border border-border bg-background py-2.5 font-sans text-xs text-foreground hover:bg-accent"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-1/2 bg-primary py-2.5 font-sans text-xs text-primary-foreground hover:opacity-90 disabled:opacity-60"
                >
                  {isSubmitting ? "Sending..." : "Send Inquiry"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}
