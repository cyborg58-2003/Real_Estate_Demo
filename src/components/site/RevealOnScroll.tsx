import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  variant?: "slide-left" | "fade-up" | "fade-in" | "zoom-in";
  delay?: number; // delay in ms
  className?: string;
};

export function RevealOnScroll({
  children,
  variant = "fade-up",
  delay = 0,
  className = "",
}: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    const el = ref.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  const getVariantStyles = () => {
    if (!isVisible) {
      switch (variant) {
        case "slide-left":
          return "opacity-0 -translate-x-12";
        case "fade-up":
          return "opacity-0 translate-y-12";
        case "zoom-in":
          return "opacity-0 scale-95";
        case "fade-in":
        default:
          return "opacity-0";
      }
    } else {
      switch (variant) {
        case "slide-left":
          return "opacity-100 translate-x-0";
        case "fade-up":
          return "opacity-100 translate-y-0";
        case "zoom-in":
          return "opacity-100 scale-100";
        case "fade-in":
        default:
          return "opacity-100";
      }
    }
  };

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${getVariantStyles()} ${className}`}
    >
      {children}
    </div>
  );
}
