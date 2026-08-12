import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { CheckCircle2, Home, Sparkles, Building, ArrowRight } from "lucide-react";

import { Header } from "@/components/site/Header";
import { SiteFooter } from "@/components/site/SiteFooter";
import { RevealOnScroll } from "@/components/site/RevealOnScroll";

export const Route = createFileRoute("/valuation")({
  head: () => ({
    meta: [
      { title: "Sell & Home Valuation — Homestead Advisory" },
      {
        name: "description",
        content:
          "Request a private, confidential valuation and architectural assessment for your home.",
      },
    ],
  }),
  component: ValuationPage,
});

const valuationSchema = z.object({
  address: z.string().trim().min(5, "Please enter your property address"),
  cityState: z.string().trim().min(2, "Please enter city and state"),
  propertyType: z.string().min(1, "Select property type"),
  estimatedSqft: z.string().optional(),
  bedrooms: z.string().optional(),
  bathrooms: z.string().optional(),
  yearBuilt: z.string().optional(),
  architectName: z.string().optional(),
  timeline: z.string().min(1, "Select selling timeline"),
  ownerName: z.string().trim().min(2, "Please enter your name"),
  ownerEmail: z.string().trim().email("Enter a valid email address"),
  ownerPhone: z.string().trim().min(7, "Enter a valid phone number"),
  notes: z.string().optional(),
});

type ValuationValues = z.infer<typeof valuationSchema>;

function ValuationPage() {
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<ValuationValues>({
    resolver: zodResolver(valuationSchema),
    defaultValues: {
      address: "",
      cityState: "",
      propertyType: "House",
      estimatedSqft: "",
      bedrooms: "4",
      bathrooms: "3",
      yearBuilt: "",
      architectName: "",
      timeline: "Exploring options (3-6 months)",
      ownerName: "",
      ownerEmail: "",
      ownerPhone: "",
      notes: "",
    },
  });

  const handleNextStep = async () => {
    const valid = await trigger(["address", "cityState", "propertyType", "timeline"]);
    if (valid) setStep(2);
  };

  const onSubmit = async (data: ValuationValues) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSubmitted(true);
    toast.success("Valuation request received", {
      description: `Thank you, ${data.ownerName}. A senior Homestead advisor will present your report within two business days.`,
    });
  };

  const fieldClass =
    "mt-2 w-full border border-border bg-panel px-4 py-3 font-sans text-sm text-foreground outline-none transition-colors focus:border-foreground/40";
  const labelClass = "font-sans text-[0.72rem] uppercase tracking-[0.18em] text-foreground/50 font-semibold";
  const errorClass = "mt-1.5 font-sans text-xs text-destructive";

  return (
    <div className="grain min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-[1400px] px-5 pb-24 pt-12 sm:px-8 sm:pt-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          {/* Left Text Column */}
          <RevealOnScroll variant="slide-left" delay={100}>
            <div>
              <span className="font-sans text-[0.72rem] uppercase tracking-[0.2em] text-foreground/45 font-semibold">
                Sell With Homestead
              </span>
            <h1 className="mt-3 font-serif text-[clamp(2.3rem,7vw,4rem)] font-light leading-[1.02] tracking-tight text-foreground">
              Confidential Home Valuation & Advisory
            </h1>
            <div className="mt-7 h-px w-14 bg-foreground/30" />
            <p className="mt-6 font-serif text-lg leading-relaxed text-foreground/80">
              Architectural homes command premium valuation when presented with design sensitivity. Our advisory team prepares bespoke valuation reports evaluating structural merits, material finishes, and global buyer demand.
            </p>

            <div className="mt-10 space-y-6 font-sans">
              <div className="flex gap-4 border-l-2 border-primary pl-4">
                <div>
                  <h4 className="font-serif text-lg text-foreground">Discreet Off-Market Matching</h4>
                  <p className="text-xs text-foreground/60 leading-relaxed mt-1">
                    Optionally introduce your residence privately to pre-vetted design collectors without public MLS exposure.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 border-l-2 border-primary pl-4">
                <div>
                  <h4 className="font-serif text-lg text-foreground">Architectural Storytelling</h4>
                  <p className="text-xs text-foreground/60 leading-relaxed mt-1">
                    Professional architectural photography, 3D spatial mapping, and editorial journal coverage.
                  </p>
                </div>
              </div>
            </div>
            </div>
          </RevealOnScroll>

          {/* Right Form Column */}
          <RevealOnScroll variant="fade-up" delay={250}>
            <div>
              {submitted ? (
              <div className="border border-border bg-panel p-10 text-center">
                <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-600" strokeWidth={1.2} />
                <h3 className="mt-4 font-serif text-3xl text-foreground font-light">Valuation Requested</h3>
                <p className="mt-3 font-serif text-base text-foreground/75 leading-relaxed">
                  Thank you for placing your trust in Homestead. Our senior valuation director will complete a comprehensive market & architectural analysis for your property.
                </p>
                <p className="mt-4 text-xs font-sans text-foreground/50">
                  Confirmation sent to your inbox. An advisor will contact you discreetly within 48 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-8 bg-primary px-8 py-3 font-sans text-xs uppercase tracking-wider text-primary-foreground hover:opacity-90"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="border border-border bg-panel p-6 sm:p-10">
                {/* Form Progress Header */}
                <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
                  <span className="font-serif text-lg text-foreground">
                    Step {step} of 2: {step === 1 ? "Property Details" : "Owner Contact"}
                  </span>
                  <span className="text-xs font-sans text-foreground/50">
                    {step === 1 ? "50% Complete" : "100% Complete"}
                  </span>
                </div>

                {step === 1 ? (
                  <div className="space-y-6">
                    <div>
                      <label className={labelClass} htmlFor="address">
                        Property Address *
                      </label>
                      <input
                        id="address"
                        placeholder="e.g. 742 Evergreen Terrace"
                        className={fieldClass}
                        {...register("address")}
                      />
                      {errors.address && <p className={errorClass}>{errors.address.message}</p>}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className={labelClass} htmlFor="cityState">
                          City & State *
                        </label>
                        <input
                          id="cityState"
                          placeholder="e.g. Malibu, CA"
                          className={fieldClass}
                          {...register("cityState")}
                        />
                        {errors.cityState && <p className={errorClass}>{errors.cityState.message}</p>}
                      </div>

                      <div>
                        <label className={labelClass} htmlFor="propertyType">
                          Property Type *
                        </label>
                        <select id="propertyType" className={fieldClass} {...register("propertyType")}>
                          <option value="House">Single Family House</option>
                          <option value="Villa">Luxury Villa</option>
                          <option value="Estate">Gated Estate / Compound</option>
                          <option value="Penthouse">Sky Penthouse</option>
                          <option value="Architectural">Architectural Landmark</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                      <div>
                        <label className={labelClass} htmlFor="estimatedSqft">
                          Approx. SqFt
                        </label>
                        <input id="estimatedSqft" placeholder="e.g. 3500" className={fieldClass} {...register("estimatedSqft")} />
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="bedrooms">
                          Bedrooms
                        </label>
                        <input id="bedrooms" placeholder="e.g. 4" className={fieldClass} {...register("bedrooms")} />
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="bathrooms">
                          Bathrooms
                        </label>
                        <input id="bathrooms" placeholder="e.g. 3.5" className={fieldClass} {...register("bathrooms")} />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass} htmlFor="timeline">
                        Selling Timeline *
                      </label>
                      <select id="timeline" className={fieldClass} {...register("timeline")}>
                        <option value="Immediate (1-2 months)">Immediate (Within 1-2 months)</option>
                        <option value="Exploring options (3-6 months)">Exploring options (3-6 months)</option>
                        <option value="Future planning (6-12 months)">Future planning (6-12 months)</option>
                        <option value="Valuation only">Curious for valuation only</option>
                      </select>
                    </div>

                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="mt-6 w-full flex items-center justify-center gap-2 bg-primary py-4 font-sans text-xs uppercase tracking-wider text-primary-foreground hover:opacity-90 transition-opacity"
                    >
                      <span>Continue to Contact Info</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <label className={labelClass} htmlFor="ownerName">
                        Full Name *
                      </label>
                      <input id="ownerName" placeholder="Your name" className={fieldClass} {...register("ownerName")} />
                      {errors.ownerName && <p className={errorClass}>{errors.ownerName.message}</p>}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className={labelClass} htmlFor="ownerEmail">
                          Email Address *
                        </label>
                        <input id="ownerEmail" type="email" placeholder="you@example.com" className={fieldClass} {...register("ownerEmail")} />
                        {errors.ownerEmail && <p className={errorClass}>{errors.ownerEmail.message}</p>}
                      </div>

                      <div>
                        <label className={labelClass} htmlFor="ownerPhone">
                          Phone Number *
                        </label>
                        <input id="ownerPhone" placeholder="+1 (555) 000-0000" className={fieldClass} {...register("ownerPhone")} />
                        {errors.ownerPhone && <p className={errorClass}>{errors.ownerPhone.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label className={labelClass} htmlFor="notes">
                        Special Features / Renovation Notes
                      </label>
                      <textarea
                        id="notes"
                        rows={3}
                        placeholder="e.g. Recently completed architectural expansion, solar roof, custom wine cellar."
                        className={`${fieldClass} resize-none`}
                        {...register("notes")}
                      />
                    </div>

                    <div className="flex gap-4 pt-2">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="w-1/3 border border-border bg-background py-4 font-sans text-xs uppercase tracking-wider text-foreground hover:bg-accent"
                      >
                        Back
                      </button>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-2/3 bg-primary py-4 font-sans text-xs uppercase tracking-wider text-primary-foreground hover:opacity-90 disabled:opacity-60"
                      >
                        {isSubmitting ? "Submitting..." : "Submit Valuation Request"}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            )}
          </div>
        </RevealOnScroll>
      </div>
    </main>

      <SiteFooter />
    </div>
  );
}
