import { Link } from "@tanstack/react-router";
import { X, Check, Trash2 } from "lucide-react";
import { formatPrice, type Property } from "@/data/properties";

type Props = {
  properties: Property[];
  isOpen: boolean;
  onClose: () => void;
  onRemove: (slug: string) => void;
};

export function PropertyCompare({ properties, isOpen, onClose, onRemove }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto border border-border bg-panel p-6 shadow-2xl sm:p-8">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <span className="font-sans text-[0.7rem] uppercase tracking-[0.18em] text-foreground/45">
              Side-by-Side Analysis
            </span>
            <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
              Compare Saved Homes ({properties.length})
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-foreground/50 hover:text-foreground"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {properties.length === 0 ? (
          <div className="py-12 text-center font-serif text-lg text-foreground/60">
            No properties selected for comparison. Save properties to compare them side-by-side.
          </div>
        ) : (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr>
                  <th className="p-3 border-b border-border font-sans text-xs uppercase text-foreground/45 w-1/4">
                    Property
                  </th>
                  {properties.map((p) => (
                    <th key={p.slug} className="p-3 border-b border-border text-center align-top">
                      <div className="relative inline-block text-center">
                        <button
                          type="button"
                          onClick={() => onRemove(p.slug)}
                          className="absolute -top-2 -right-2 rounded-full bg-destructive text-destructive-foreground p-1 hover:opacity-90"
                          title="Remove from comparison"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                        <img
                          src={p.image}
                          alt={p.name}
                          className="h-28 w-40 object-cover border border-border mx-auto"
                        />
                        <h4 className="mt-2 font-serif text-base text-foreground leading-tight">{p.name}</h4>
                        <p className="font-sans text-xs text-foreground/60">{p.location}</p>
                        <Link
                          to="/properties/$slug"
                          params={{ slug: p.slug }}
                          className="mt-2 inline-block bg-primary px-3 py-1 font-sans text-xs text-primary-foreground hover:opacity-90"
                        >
                          View Details
                        </Link>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border font-sans text-sm">
                <tr>
                  <td className="p-3 text-foreground/60 font-medium">Price</td>
                  {properties.map((p) => (
                    <td key={p.slug} className="p-3 text-center font-serif text-lg font-semibold text-foreground">
                      {formatPrice(p.price)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 text-foreground/60 font-medium">Bedrooms / Baths</td>
                  {properties.map((p) => (
                    <td key={p.slug} className="p-3 text-center text-foreground">
                      {p.beds} beds / {p.baths} baths
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 text-foreground/60 font-medium">Interior Living</td>
                  {properties.map((p) => (
                    <td key={p.slug} className="p-3 text-center text-foreground">
                      {p.sqft.toLocaleString()} sqft
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 text-foreground/60 font-medium">Price per SqFt</td>
                  {properties.map((p) => (
                    <td key={p.slug} className="p-3 text-center text-foreground">
                      ${p.pricePerSqft} / sqft
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 text-foreground/60 font-medium">Year Built</td>
                  {properties.map((p) => (
                    <td key={p.slug} className="p-3 text-center text-foreground">
                      {p.year}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 text-foreground/60 font-medium">Lot Size</td>
                  {properties.map((p) => (
                    <td key={p.slug} className="p-3 text-center text-foreground">
                      {p.lot}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 text-foreground/60 font-medium">Architect</td>
                  {properties.map((p) => (
                    <td key={p.slug} className="p-3 text-center text-foreground font-serif italic">
                      {p.architect}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 text-foreground/60 font-medium">Virtual Tour</td>
                  {properties.map((p) => (
                    <td key={p.slug} className="p-3 text-center text-foreground">
                      {p.virtualTourAvailable ? (
                        <span className="inline-flex items-center gap-1 text-emerald-600 text-xs font-semibold">
                          <Check className="h-4 w-4" /> Available
                        </span>
                      ) : (
                        <span className="text-foreground/40 text-xs">On Request</span>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
