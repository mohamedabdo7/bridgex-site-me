"use client";

import { useState, useEffect } from "react";

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(
    null,
  );
  const [prevOffset, setPrevOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = window.pageYOffset;

      if (currentOffset > prevOffset) {
        setScrollDirection("down");
      } else if (currentOffset < prevOffset) {
        setScrollDirection("up");
      }

      setPrevOffset(currentOffset);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevOffset]);

  return scrollDirection;
}
