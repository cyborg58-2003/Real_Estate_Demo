import { useState, useEffect, useCallback } from "react";
import { PROPERTIES, type Property } from "@/data/properties";

const STORAGE_KEY = "homestead_saved_properties";
const EVENT_NAME = "homestead_saved_change";

export function useSavedProperties() {
  const [savedSlugs, setSavedSlugs] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const syncSlugs = useCallback(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      setSavedSlugs(stored ? JSON.parse(stored) : []);
    } catch {
      setSavedSlugs([]);
    }
  }, []);

  useEffect(() => {
    window.addEventListener(EVENT_NAME, syncSlugs);
    window.addEventListener("storage", syncSlugs);
    return () => {
      window.removeEventListener(EVENT_NAME, syncSlugs);
      window.removeEventListener("storage", syncSlugs);
    };
  }, [syncSlugs]);

  const saveSlugsToStorage = (newSlugs: string[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSlugs));
      setSavedSlugs(newSlugs);
      window.dispatchEvent(new Event(EVENT_NAME));
    } catch (err) {
      console.error("Failed to save to localStorage:", err);
    }
  };

  const toggleSave = useCallback(
    (slug: string) => {
      setSavedSlugs((prev) => {
        const next = prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug];
        saveSlugsToStorage(next);
        return next;
      });
    },
    []
  );

  const isSaved = useCallback((slug: string) => savedSlugs.includes(slug), [savedSlugs]);

  const clearAll = useCallback(() => {
    saveSlugsToStorage([]);
  }, []);

  const savedProperties: Property[] = PROPERTIES.filter((p) => savedSlugs.includes(p.slug));

  return {
    savedSlugs,
    savedProperties,
    count: savedSlugs.length,
    isSaved,
    toggleSave,
    clearAll,
  };
}
