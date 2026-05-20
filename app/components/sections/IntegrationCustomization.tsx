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

const IntegrationCustomization: React.FC<SectionProps> = ({
  scrollToFooter,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const bgTopLeftRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgBottomRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
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

      timeline.to(dashboardRef.current, {
        x: "0%",
        y: "0%",
        duration: 1.5,
        ease: "power2.out",
      });

      timeline.to(
        bgTopLeftRef.current,
        {
          rotate: 40,
          x: "350px",
          y: "300px",
          scale: 1,
          duration: 1.5,
          ease: "power2.out",
        },
        "<",
      );

      timeline.to(
        contentRef.current,
        { y: "0", opacity: 1, duration: 1.5, ease: "power2.out" },
        "<",
      );

      timeline.to(
        bgBottomRightRef.current,
        {
          x: "200px",
          y: "200px",
          rotate: 150,
          scale: 0.5,
          duration: 1.5,
          ease: "power2.out",
        },
        "<",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[var(--background)] min-h-screen text-white py-16 px-8 lg:px-16 flex items-center overflow-hidden"
    >
      {/* Top-left Background */}
      <div
        ref={bgTopLeftRef}
        className="absolute rotate-[10deg] top-[-200px] left-[-400px] w-[883px] h-[524px] z-[-1]"
        style={{
          backgroundImage: "url('/topleft-bg.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          transform: "scale(0.5)",
          willChange: "transform",
        }}
      />

      {/* Bottom-right Background */}
      <div
        ref={bgBottomRightRef}
        className="absolute rotate-[20deg] bottom-[100px] right-[50px] w-[470px] h-[360px] bg-cover"
        style={{
          backgroundImage: "url('/bottomright-bg.png')",
          willChange: "transform",
        }}
      />

      {/* Content Wrapper */}
      <div className="relative flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto gap-12 w-full">
        {/* Left: Dashboard */}
        <div
          ref={dashboardRef}
          className="w-full lg:w-1/2 flex justify-center"
          style={{ transform: "translate(-75%, 75%)", willChange: "transform" }}
        >
          <Image
            src="/dashboard.png"
            alt="Dashboard Preview"
            width={800}
            height={400}
            className="rounded-lg shadow-lg border border-white/10 z-[1] w-full"
            priority
            quality={85}
          />
        </div>

        {/* Right: Content */}
        <div
          ref={contentRef}
          className="w-full lg:w-1/2 text-center lg:text-left opacity-0"
          style={{
            transform: "translateY(-30%)",
            willChange: "transform, opacity",
          }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gradient">
            High Level of Integration &amp; Customization
          </h2>

          <p className="text-[var(--muted-foreground)] text-lg mt-6 leading-relaxed">
            BridgeX seamlessly integrates with your existing systems, creating a
            truly customized workspace solution that fits your specific needs.
          </p>

          <button onClick={scrollToFooter} className={cn("btn-primary mt-8")}>
            Request a demo
          </button>
        </div>
      </div>
    </section>
  );
};

export default IntegrationCustomization;
