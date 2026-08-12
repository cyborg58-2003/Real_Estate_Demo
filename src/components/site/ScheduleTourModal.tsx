import { useState } from "react";
import { X, Calendar, Clock, Video, UserCheck, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import type { Property } from "@/data/properties";

type Props = {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
};

export function ScheduleTourModal({ property, isOpen, onClose }: Props) {
  const [tourType, setTourType] = useState<"in-person" | "video">("in-person");
  const [date, setDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  });
  const [timeSlot, setTimeSlot] = useState("10:00 AM");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast.error("Please fill in your name and email.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast.success("Tour request confirmed!", {
        description: `Your ${tourType === "in-person" ? "In-Person" : "Video"} tour for ${
          property.name
        } is scheduled for ${date} at ${timeSlot}. An advisor will reach out shortly.`,
      });
    }, 600);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setName("");
    setEmail("");
    setPhone("");
    setNotes("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto border border-border bg-panel p-6 shadow-2xl sm:p-8">
        <button
          type="button"
          onClick={handleResetAndClose}
          className="absolute right-4 top-4 text-foreground/50 hover:text-foreground"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center">
            <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-600" strokeWidth={1.2} />
            <h3 className="mt-4 font-serif text-2xl text-foreground">Tour Requested!</h3>
            <p className="mt-2 font-sans text-[0.9rem] text-foreground/70">
              Thank you, <strong className="text-foreground">{name}</strong>. We have received your
              request to view <strong className="text-foreground">{property.name}</strong> on{" "}
              <strong>{date}</strong> at <strong>{timeSlot}</strong>.
            </p>
            <p className="mt-4 text-[0.8rem] text-foreground/50">
              A Homestead advisor has been notified and will send calendar confirmation to {email}.
            </p>
            <button
              type="button"
              onClick={handleResetAndClose}
              className="mt-8 bg-primary px-8 py-3 font-sans text-sm text-primary-foreground hover:opacity-90"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="border-b border-border pb-4">
              <span className="font-sans text-[0.7rem] uppercase tracking-[0.18em] text-foreground/45">
                Private Viewing
              </span>
              <h2 className="mt-1 font-serif text-2xl text-foreground sm:text-3xl">
                Schedule a Tour
              </h2>
              <p className="mt-1 font-serif text-sm text-foreground/60">{property.name}</p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              {/* Tour Type Toggle */}
              <div>
                <label className="block font-sans text-[0.72rem] uppercase tracking-[0.18em] text-foreground/50">
                  Select Tour Type
                </label>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setTourType("in-person")}
                    className={`flex items-center justify-center gap-2 border px-4 py-3 font-sans text-[0.85rem] transition-colors ${
                      tourType === "in-person"
                        ? "border-foreground bg-primary text-primary-foreground"
                        : "border-border bg-background text-foreground/75 hover:border-foreground/40"
                    }`}
                  >
                    <UserCheck className="h-4 w-4" />
                    In-Person Tour
                  </button>
                  <button
                    type="button"
                    onClick={() => setTourType("video")}
                    className={`flex items-center justify-center gap-2 border px-4 py-3 font-sans text-[0.85rem] transition-colors ${
                      tourType === "video"
                        ? "border-foreground bg-primary text-primary-foreground"
                        : "border-border bg-background text-foreground/75 hover:border-foreground/40"
                    }`}
                  >
                    <Video className="h-4 w-4" />
                    Live Video Tour
                  </button>
                </div>
              </div>

              {/* Date and Time Selector */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="tour-date" className="block font-sans text-[0.72rem] uppercase tracking-[0.18em] text-foreground/50">
                    Date
                  </label>
                  <div className="relative mt-2">
                    <input
                      id="tour-date"
                      type="date"
                      value={date}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full border border-border bg-background px-3 py-2.5 font-sans text-[0.85rem] text-foreground outline-none focus:border-foreground/40"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="tour-time" className="block font-sans text-[0.72rem] uppercase tracking-[0.18em] text-foreground/50">
                    Preferred Time
                  </label>
                  <select
                    id="tour-time"
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="mt-2 w-full border border-border bg-background px-3 py-2.5 font-sans text-[0.85rem] text-foreground outline-none focus:border-foreground/40"
                  >
                    <option value="10:00 AM">10:00 AM (Morning)</option>
                    <option value="01:00 PM">01:00 PM (Afternoon)</option>
                    <option value="04:00 PM">04:00 PM (Late Afternoon)</option>
                    <option value="06:00 PM">06:00 PM (Sunset Hour)</option>
                  </select>
                </div>
              </div>

              {/* User Info */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="tour-name" className="block font-sans text-[0.72rem] uppercase tracking-[0.18em] text-foreground/50">
                    Full Name *
                  </label>
                  <input
                    id="tour-name"
                    type="text"
                    placeholder="Jane Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2 w-full border border-border bg-background px-3.5 py-2.5 font-sans text-[0.85rem] text-foreground outline-none focus:border-foreground/40"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="tour-email" className="block font-sans text-[0.72rem] uppercase tracking-[0.18em] text-foreground/50">
                    Email *
                  </label>
                  <input
                    id="tour-email"
                    type="email"
                    placeholder="jane@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 w-full border border-border bg-background px-3.5 py-2.5 font-sans text-[0.85rem] text-foreground outline-none focus:border-foreground/40"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="tour-phone" className="block font-sans text-[0.72rem] uppercase tracking-[0.18em] text-foreground/50">
                  Phone (Optional)
                </label>
                <input
                  id="tour-phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-2 w-full border border-border bg-background px-3.5 py-2.5 font-sans text-[0.85rem] text-foreground outline-none focus:border-foreground/40"
                />
              </div>

              <div>
                <label htmlFor="tour-notes" className="block font-sans text-[0.72rem] uppercase tracking-[0.18em] text-foreground/50">
                  Special Requests / Questions
                </label>
                <textarea
                  id="tour-notes"
                  rows={2}
                  placeholder="e.g. Interested in architectural history, parking requirements"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="mt-2 w-full resize-none border border-border bg-background px-3.5 py-2 font-sans text-[0.85rem] text-foreground outline-none focus:border-foreground/40"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary py-3.5 font-sans text-[0.85rem] text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {isSubmitting ? "Confirming..." : "Confirm Viewing Request"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
