import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
};

export function ImageLightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onSelectIndex,
}: Props) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        onSelectIndex((currentIndex - 1 + images.length) % images.length);
      }
      if (e.key === "ArrowRight") {
        onSelectIndex((currentIndex + 1) % images.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, images.length, onClose, onSelectIndex]);

  if (!isOpen || images.length === 0) return null;

  const handlePrev = () => {
    onSelectIndex((currentIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    onSelectIndex((currentIndex + 1) % images.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md animate-in fade-in duration-200">
      {/* Top bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white/80 font-sans text-sm z-10">
        <span>
          Photo {currentIndex + 1} of {images.length}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
          aria-label="Close Lightbox"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Main Image */}
      <div className="relative max-h-[85vh] max-w-[90vw] overflow-hidden flex items-center justify-center">
        <img
          src={images[currentIndex]}
          alt={`Gallery slide ${currentIndex + 1}`}
          className="max-h-[85vh] max-w-[90vw] object-contain shadow-2xl select-none"
        />
      </div>

      {/* Nav Controls */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/25 transition-colors"
            aria-label="Previous photo"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/25 transition-colors"
            aria-label="Next photo"
          >
            <ChevronRight className="h-7 w-7" />
          </button>
        </>
      )}

      {/* Thumbnail Bar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 overflow-x-auto max-w-[80vw] p-2 bg-black/40 rounded-lg">
        {images.map((img, idx) => (
          <button
            key={img + idx}
            type="button"
            onClick={() => onSelectIndex(idx)}
            className={`h-12 w-16 overflow-hidden rounded transition-all border-2 ${
              idx === currentIndex ? "border-white scale-105" : "border-transparent opacity-50 hover:opacity-100"
            }`}
          >
            <img src={img} alt={`Thumb ${idx + 1}`} className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
