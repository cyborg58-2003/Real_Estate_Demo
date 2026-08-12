import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { Header } from "@/components/site/Header";
import { SiteFooter } from "@/components/site/SiteFooter";
import { RevealOnScroll } from "@/components/site/RevealOnScroll";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Homestead Luxury Real Estate" },
      {
        name: "description",
        content:
          "Speak with the Homestead team about a private viewing, a valuation, or finding a home that suits the way you live.",
      },
      { property: "og:title", content: "Contact Homestead" },
      {
        property: "og:description",
        content: "Arrange a private viewing or ask about a Homestead property.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100, "Name is too long"),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email")
    .email("Enter a valid email address")
    .max(255, "Email is too long"),
  phone: z.string().trim().max(30, "Phone number is too long").optional(),
  interest: z.string().trim().max(120).optional(),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more (at least 10 characters)")
    .max(1000, "Message must be under 1000 characters"),
});

type ContactValues = z.infer<typeof contactSchema>;

const INTERESTS = ["Buying", "Selling", "Private viewing", "General enquiry"];

function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", interest: "", message: "" },
  });

  const onSubmit = async (values: ContactValues) => {
    // Simulated submission: swap for a server function when a backend is added.
    await new Promise((resolve) => setTimeout(resolve, 600));
    toast.success("Message sent", {
      description: `Thank you, ${values.name}. A Homestead advisor will reply within one business day.`,
    });
    reset();
  };

  const fieldClass =
    "mt-2 w-full border border-border bg-panel px-4 py-3 font-sans text-[0.9rem] text-foreground outline-none transition-colors placeholder:text-foreground/35 focus:border-foreground/40";
  const labelClass = "font-sans text-[0.72rem] uppercase tracking-[0.18em] text-foreground/50";
  const errorClass = "mt-2 font-sans text-[0.78rem] text-destructive";

  return (
    <div className="grain min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-[1400px] px-5 pb-20 pt-10 sm:px-8 sm:pb-28 sm:pt-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <RevealOnScroll variant="slide-left" delay={100}>
            <div>
              <h1 className="font-serif text-[clamp(2.3rem,8vw,4rem)] font-light leading-[1.02] tracking-tight text-foreground">
                Get in Touch
              </h1>
            <div className="mt-7 h-px w-14 bg-foreground/25" />
            <p className="mt-6 max-w-md font-serif text-[1.1rem] leading-relaxed text-foreground/70 sm:text-[1.25rem]">
              Tell us what you are looking for. Our advisors arrange private viewings, quiet
              off-market introductions, and considered valuations.
            </p>

            <dl className="mt-12 space-y-6 font-sans text-[0.9rem]">
              <div>
                <dt className={labelClass}>Studio</dt>
                <dd className="mt-2 text-foreground/75">
                  114 Alder Lane, Sunset Valley, CA 94062
                </dd>
              </div>
              <div>
                <dt className={labelClass}>Email</dt>
                <dd className="mt-2 text-foreground/75">enquiries@homestead.estate</dd>
              </div>
              <div>
                <dt className={labelClass}>Telephone</dt>
                <dd className="mt-2 text-foreground/75">+1 (415) 555 0148</dd>
              </div>
            </dl>
          </div>
        </RevealOnScroll>

        <RevealOnScroll variant="fade-up" delay={250}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="border border-border p-6 sm:p-10">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  className={fieldClass}
                  placeholder="Your full name"
                  aria-invalid={Boolean(errors.name)}
                  {...register("name")}
                />
                {errors.name && <p className={errorClass}>{errors.name.message}</p>}
              </div>

              <div>
                <label className={labelClass} htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className={fieldClass}
                  placeholder="you@example.com"
                  aria-invalid={Boolean(errors.email)}
                  {...register("email")}
                />
                {errors.email && <p className={errorClass}>{errors.email.message}</p>}
              </div>

              <div>
                <label className={labelClass} htmlFor="phone">
                  Phone (optional)
                </label>
                <input
                  id="phone"
                  className={fieldClass}
                  placeholder="+1 (000) 000 0000"
                  {...register("phone")}
                />
                {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
              </div>

              <div>
                <label className={labelClass} htmlFor="interest">
                  Interest
                </label>
                <select id="interest" className={fieldClass} {...register("interest")}>
                  <option value="">Select an option</option>
                  {INTERESTS.map((interest) => (
                    <option key={interest} value={interest}>
                      {interest}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label className={labelClass} htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                className={`${fieldClass} resize-none`}
                placeholder="Tell us about the home you have in mind."
                aria-invalid={Boolean(errors.message)}
                {...register("message")}
              />
              {errors.message && <p className={errorClass}>{errors.message.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-8 w-full bg-primary px-8 py-4 font-sans text-[0.85rem] text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-auto"
            >
              {isSubmitting ? "Sending…" : "Send Message"}
            </button>
          </form>
        </RevealOnScroll>
      </div>
    </main>

      <SiteFooter />
    </div>
  );
}
