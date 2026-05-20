"use client";

import { useIntersectionObserver } from "@/app/hooks/useIntersectionObserver";
import { cn } from "@/app/lib/utils";
import { type ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: "fade-in-up" | "slide-in-right" | "scale-in";
  delay?: number;
}

export function AnimatedSection({
  children,
  className,
  animation = "fade-in-up",
  delay = 0,
}: AnimatedSectionProps) {
  const { ref, isInView } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700",
        isInView ? `animate-${animation}` : "opacity-0",
        className,
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
