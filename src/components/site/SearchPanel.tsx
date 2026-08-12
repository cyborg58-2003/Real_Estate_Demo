import { useState, useRef, useEffect } from "react";
import { MapPin, Home, DollarSign, Search, ChevronDown, RotateCcw, Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { LOCATIONS, PRICE_RANGES, PROPERTY_TYPES } from "@/data/properties";

export type Filters = {
  searchQuery: string;
  location: string;
  type: string;
  price: string;
};

export const EMPTY_FILTERS: Filters = { searchQuery: "", location: "", type: "", price: "" };

type Props = {
  filters: Filters;
  onChange: (filters: Filters) => void;
  onSearch: () => void;
};

function CustomSelect({
  icon: Icon,
  placeholder,
  value,
  options,
  onChange,
}: {
  icon: LucideIcon;
  placeholder: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full md:flex-1">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`relative flex items-center justify-between w-full border bg-background py-2.5 pl-9 pr-8 font-sans text-xs sm:text-[0.85rem] text-left outline-none md:py-3 transition-all duration-200 ${
          open
            ? "border-foreground/60 shadow-md ring-1 ring-foreground/20"
            : value
            ? "border-foreground/40 text-foreground font-medium"
            : "border-border text-foreground/75 hover:border-foreground/30"
        }`}
      >
        <Icon
          className={`pointer-events-none absolute left-3 h-3.5 w-3.5 transition-colors ${
            value ? "text-primary font-bold" : "text-foreground/50"
          }`}
          strokeWidth={1.5}
        />
        <span className="truncate">{value || placeholder}</span>
        <ChevronDown
          className={`pointer-events-none absolute right-2.5 h-3.5 w-3.5 text-foreground/50 transition-transform duration-200 ${
            open ? "rotate-180 text-foreground" : ""
          }`}
          strokeWidth={1.4}
        />
      </button>

      {/* Floating Options Menu */}
      {open && (
        <div className="absolute top-[108%] left-0 right-0 z-50 max-h-60 overflow-y-auto border border-border/90 bg-panel/98 backdrop-blur-md p-1.5 shadow-2xl animate-in fade-in-80 zoom-in-95 duration-150">
          <div
            onClick={() => {
              onChange("");
              setOpen(false);
            }}
            className={`flex items-center justify-between px-3 py-2 text-xs sm:text-[0.82rem] font-sans cursor-pointer transition-colors ${
              !value ? "bg-accent font-medium text-foreground" : "text-foreground/70 hover:bg-accent/60 hover:text-foreground"
            }`}
          >
            <span>All {placeholder}s</span>
            {!value && <Check className="h-3.5 w-3.5 text-primary shrink-0" />}
          </div>

          <div className="h-px bg-border/60 my-1" />

          {options.map((option) => {
            const isSelected = value === option;
            return (
              <div
                key={option}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={`flex items-center justify-between px-3 py-2 text-xs sm:text-[0.82rem] font-sans cursor-pointer transition-colors ${
                  isSelected
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-foreground/80 hover:bg-accent hover:text-foreground"
                }`}
              >
                <span className="truncate">{option}</span>
                {isSelected && <Check className="h-3.5 w-3.5 shrink-0 ml-2" />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function SearchPanel({ filters, onChange, onSearch }: Props) {
  const isFiltered = Boolean(
    filters.searchQuery || filters.location || filters.type || filters.price
  );

  return (
    <div className="bg-panel/95 backdrop-blur-md border border-border/80 p-3 sm:p-4 shadow-[0_20px_50px_-20px_rgba(20,16,12,0.5)] w-full">
      {/* Divided Grid on Mobile (2 columns), 1 Line Horizontal Bar on Desktop */}
      <div className="grid grid-cols-2 gap-2 md:flex md:flex-row md:items-center md:gap-2.5 w-full">
        {/* Search Query Input - Full width on Mobile top row */}
        <div className="col-span-2 md:col-span-1 relative flex md:flex-1 items-center border border-border bg-background transition-colors focus-within:border-foreground/40 hover:border-foreground/30">
          <Search className="pointer-events-none absolute left-3 h-3.5 w-3.5 text-foreground/50 shrink-0" />
          <input
            type="text"
            placeholder="Search keywords or property name..."
            value={filters.searchQuery}
            onChange={(e) => onChange({ ...filters, searchQuery: e.target.value })}
            className="w-full bg-transparent py-2.5 pl-9 pr-3 font-sans text-xs sm:text-[0.85rem] text-foreground outline-none placeholder:text-foreground/40 md:py-3"
          />
        </div>

        {/* Location Custom Dropdown */}
        <div className="col-span-1 md:flex-1">
          <CustomSelect
            icon={MapPin}
            placeholder="Location"
            value={filters.location}
            options={LOCATIONS}
            onChange={(location) => onChange({ ...filters, location })}
          />
        </div>

        {/* Property Type Custom Dropdown */}
        <div className="col-span-1 md:flex-1">
          <CustomSelect
            icon={Home}
            placeholder="Property Type"
            value={filters.type}
            options={PROPERTY_TYPES}
            onChange={(type) => onChange({ ...filters, type })}
          />
        </div>

        {/* Price Range Custom Dropdown */}
        <div className="col-span-1 md:flex-1">
          <CustomSelect
            icon={DollarSign}
            placeholder="Price Range"
            value={filters.price}
            options={PRICE_RANGES.map((range) => range.label)}
            onChange={(price) => onChange({ ...filters, price })}
          />
        </div>

        {/* Search & Reset Buttons */}
        <div className="col-span-1 flex gap-1.5 md:contents">
          {isFiltered && (
            <button
              type="button"
              onClick={() => onChange(EMPTY_FILTERS)}
              className="border border-border bg-background p-2.5 md:px-3 md:py-3 font-sans text-xs text-foreground/70 hover:text-foreground hover:border-foreground/40 transition-colors shrink-0 flex items-center justify-center"
              title="Reset search filters"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          )}

          <button
            type="button"
            onClick={onSearch}
            className="w-full md:w-auto bg-primary px-4 py-2.5 md:px-8 md:py-3 font-sans text-xs md:text-[0.85rem] text-primary-foreground transition-opacity hover:opacity-90 flex items-center justify-center gap-1.5 font-medium whitespace-nowrap"
          >
            <Search className="h-3.5 w-3.5" />
            <span>Search</span>
          </button>
        </div>
      </div>
    </div>
  );
}
