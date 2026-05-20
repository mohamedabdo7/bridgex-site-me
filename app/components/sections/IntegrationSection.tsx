"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { cn } from "@/app/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface SectionProps {
  scrollToFooter: () => void;
}

const IntegrationSection: React.FC<SectionProps> = ({ scrollToFooter }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mask1Ref = useRef<HTMLDivElement>(null);
  const mask2Ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const logo1Ref = useRef<HTMLImageElement>(null);
  const logo2Ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Logos move closer
      tl.fromTo(
        logo1Ref.current,
        { x: "-100px" },
        { x: "0px", duration: 0.5, ease: "power2.out" },
      );
      tl.fromTo(
        logo2Ref.current,
        { x: "100px" },
        { x: "0px", duration: 0.5, ease: "power2.out" },
        "<",
      );

      // Masks partially separate
      tl.to(
        [mask1Ref.current, mask2Ref.current],
        {
          x: (i) => (i === 0 ? "-200px" : "200px"),
          rotation: (i) => (i === 0 ? -30 : 30),
          duration: 1,
          ease: "power2.out",
        },
        "<",
      );

      // Content starts appearing
      tl.to(
        contentRef.current,
        { opacity: 0.5, duration: 0.5, ease: "power2.out" },
        "<",
      );

      // Masks fully separate
      tl.to([mask1Ref.current, mask2Ref.current], {
        x: (i) => (i === 0 ? "-550px" : "550px"),
        rotation: (i) => (i === 0 ? -60 : 60),
        duration: 1,
        ease: "power2.out",
      });

      // Content fully visible
      tl.to(
        contentRef.current,
        { opacity: 1, duration: 0.5, ease: "power2.out" },
        "<",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative bg-[var(--background)] min-h-screen overflow-hidden"
    >
      {/* Left Mask */}
      <div
        ref={mask1Ref}
        className="absolute top-0 z-10 w-1/2 h-full bg-cover bg-center"
        style={{
          backgroundImage: "url('/Mask.png')",
          filter: "blur(20px)",
          willChange: "transform",
          left: 0,
        }}
      />

      {/* Right Mask */}
      <div
        ref={mask2Ref}
        className="absolute top-0 z-10 w-1/2 h-full bg-cover bg-center"
        style={{
          backgroundImage: "url('/Mask.png')",
          filter: "blur(20px)",
          willChange: "transform",
          left: "50%",
        }}
      />

      {/* Logos */}
      <div className="flex items-center justify-center space-x-5 relative z-30 mt-[20vh]">
        <Image
          ref={logo1Ref}
          src="/ejar-logo-1.png"
          alt="Ejar Logo"
          width={128}
          height={128}
          className="w-32"
          quality={85}
          style={{ willChange: "transform" }}
        />
        <Image
          ref={logo2Ref}
          src="/ejar-logo-2.png"
          alt="Ejar Logo 2"
          width={128}
          height={128}
          className="w-32"
          quality={85}
          style={{ willChange: "transform" }}
        />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-30 text-center mt-12 opacity-0 px-4"
      >
        <h2 className="text-[var(--heading)] text-center font-poppins text-[40px] font-normal leading-[1.5] tracking-[0.76px]">
          Property Management with <br />
          <span className="text-gradient">EJAR</span> Integration
        </h2>

        <p className="text-[var(--muted-foreground)] text-center font-poppins text-base font-light leading-[1.5] mt-4 max-w-lg mx-auto">
          BridgeX seamlessly integrates with your existing systems, creating a
          truly customized workspace solution.
        </p>

        <button onClick={scrollToFooter} className={cn("btn-primary mt-6")}>
          Request a demo
        </button>
      </div>
    </div>
  );
};

export default IntegrationSection;
