"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { cn } from "@/app/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface SectionProps {
  scrollToFooter: () => void;
}

const STEPS = [
  { word: "Experience", image: "/lamp-stage-1.png" },
  { word: "the power", image: "/lamp-stage-2.png" },
  { word: "of connected", image: "/lamp-stage-3.png" },
  { word: "devices.", image: "/lamp-stage-4.png" },
];

const STEP_SIZE = 1 / (STEPS.length + 1);

const ConnectedDevices: React.FC<SectionProps> = ({ scrollToFooter }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const litRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Initial states ──
      // Lit layers start fully transparent
      litRefs.current.forEach((el) => gsap.set(el, { opacity: 0 }));
      // Images hidden
      imageRefs.current.forEach((el) =>
        gsap.set(el, { opacity: 0, scale: 1.06 }),
      );
      // Bottom elements hidden
      gsap.set([paragraphRef.current, buttonRef.current], {
        opacity: 0,
        y: 14,
      });

      // ── Timeline ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=2400",
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.floor(self.progress / STEP_SIZE);
            setActiveIndex(Math.min(idx, STEPS.length - 1));
          },
        },
      });

      STEPS.forEach((_, i) => {
        const pos = i * STEP_SIZE;

        // Reveal the blue layer on top of the gray word → no color tween, just opacity
        tl.to(
          litRefs.current[i],
          { opacity: 1, duration: STEP_SIZE, ease: "none" },
          pos,
        );

        // Fade in current image
        tl.to(
          imageRefs.current[i],
          { opacity: 1, scale: 1, duration: STEP_SIZE * 0.8, ease: "none" },
          pos,
        );

        // Fade out previous image
        if (i > 0) {
          tl.to(
            imageRefs.current[i - 1],
            {
              opacity: 0,
              scale: 0.94,
              duration: STEP_SIZE * 0.8,
              ease: "none",
            },
            pos,
          );
        }
      });

      // Reveal paragraph + button
      const afterSteps = STEPS.length * STEP_SIZE;
      tl.to(
        paragraphRef.current,
        { opacity: 1, y: 0, duration: STEP_SIZE * 0.6, ease: "none" },
        afterSteps,
      );
      tl.to(
        buttonRef.current,
        { opacity: 1, y: 0, duration: STEP_SIZE * 0.6, ease: "none" },
        afterSteps + STEP_SIZE * 0.1,
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="connected-devices min-h-screen bg-[var(--background)] text-white flex flex-col md:flex-row items-center justify-between overflow-hidden"
    >
      {/* ── Right: Stacked Images ── */}
      <div className="order-1 md:order-2 flex-1 relative flex items-center justify-center p-6 sm:p-10 md:p-20 min-h-[320px]">
        <div
          className="absolute inset-0 pointer-events-none rounded-xl"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(22,113,226,0.07) 0%, transparent 70%)",
          }}
        />
        {STEPS.map((step, i) => (
          <div
            key={step.image}
            ref={(el) => {
              imageRefs.current[i] = el;
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Image
              src={step.image}
              alt={`Lamp stage ${i + 1}`}
              width={280}
              height={280}
              className="object-contain drop-shadow-2xl"
              priority={i === 0}
              quality={90}
            />
          </div>
        ))}
      </div>

      {/* ── Left: Text ── */}
      <div className="order-2 md:order-1 flex-1 flex flex-col items-start justify-center space-y-4 p-6 sm:p-10 md:p-20">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-snug w-full">
          {STEPS.map((step, i) => (
            <span key={step.word} className="relative block">
              {/* Base layer — always muted gray, never changes */}
              <span className="inline-block" style={{ color: "#9CA3AF" }}>
                {step.word}
              </span>

              {/* Lit layer — exact same text in primary blue, sits on top */}
              {/* GSAP only tweens this opacity: 0 → 1, no color change ever */}
              <span
                ref={(el) => {
                  litRefs.current[i] = el;
                }}
                aria-hidden
                className="absolute inset-0 inline-block pointer-events-none"
                style={{
                  color: "#1671E2",
                  textShadow: "0 0 24px rgba(22, 113, 226, 0.5)",
                  willChange: "opacity",
                }}
              >
                {step.word}
              </span>
            </span>
          ))}
        </h1>

        {/* Progress dots */}
        <div className="flex gap-2 mt-1">
          {STEPS.map((_, i) => (
            <span
              key={i}
              className="block h-1.5 rounded-full transition-all duration-300 ease-out"
              style={{
                width: activeIndex >= i ? "24px" : "6px",
                background: activeIndex >= i ? "#1671E2" : "#9CA3AF",
                opacity: activeIndex >= i ? 1 : 0.3,
              }}
            />
          ))}
        </div>

        <p
          ref={paragraphRef}
          className="text-sm sm:text-base text-[var(--muted-foreground)] max-w-sm"
          style={{ willChange: "opacity, transform" }}
        >
          BridgeX seamlessly integrates with a wide range of hardware, including
          digital keys, climate control systems, and advanced security features.
        </p>

        <button
          ref={buttonRef}
          onClick={scrollToFooter}
          className={cn("btn-primary")}
          style={{ willChange: "opacity, transform" }}
        >
          Request a demo
        </button>
      </div>
    </div>
  );
};

export default ConnectedDevices;
