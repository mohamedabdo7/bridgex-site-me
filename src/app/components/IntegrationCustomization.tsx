"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  scrollToFooter: () => void;
}

const IntegrationCustomization: React.FC<HeroProps> = ({ scrollToFooter }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const bgTopLeftRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgBottomRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current; // Store ref value

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: 1, // Smoother scrubbing
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // Combine animations that happen simultaneously
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
      "<"
    );

    timeline.to(
      contentRef.current,
      {
        y: "0",
        duration: 1.5,
        ease: "power2.out",
      },
      "<"
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
      "<"
    );

    return () => {
      if (section) {
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.trigger === section) {
            trigger.kill();
          }
        });
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#202328] min-h-screen text-white py-16 px-8 lg:px-16 flex items-center overflow-hidden"
    >
      {/* Top-left Background Image - Optimized */}
      <div
        ref={bgTopLeftRef}
        className="absolute rotate-[10deg] top-[-200px] left-[-400px] w-[883px] h-[524px] bg-cover z-[-1]"
        style={{
          backgroundImage: "url('./topleft-bg.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          transform: "scale(0.5)",
          willChange: "transform",
        }}
      />

      {/* Bottom-right Background Image - Optimized */}
      <div
        ref={bgBottomRightRef}
        className="absolute rotate-[20deg] bottom-[100px] right-[50px] w-[470px] h-[360px] bg-cover"
        style={{
          backgroundImage: "url('./bottomright-bg.png')",
          willChange: "transform",
        }}
      />

      {/* Content Wrapper */}
      <div className="relative flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto gap-12 w-full">
        {/* Left: Dashboard Mockup */}
        <div
          ref={dashboardRef}
          className="w-full lg:w-1/2 flex justify-center transform translate-x-[-75%] translate-y-[75%]"
          style={{ willChange: "transform" }}
        >
          <Image
            src="/dashboard.png"
            alt="Dashboard Preview"
            width={800}
            height={400}
            className="rounded-lg shadow-lg border border-gray-700 z-[1]"
            priority
            quality={85}
          />
        </div>

        {/* Right: Content */}
        <div
          ref={contentRef}
          className="w-full lg:w-1/2 text-center lg:text-left translate-y-[-30%]"
          style={{ willChange: "transform" }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gradient bg-gradient-to-b from-[#08E4D2] to-[#1671E2] bg-clip-text text-transparent">
            High Level of <span>Integration</span> & <span>Customization</span>
          </h2>

          <p className="text-gray-400 text-lg mt-6 leading-relaxed">
            BridgeX seamlessly integrates with your existing systems, creating a
            truly customized workspace solution that fits your specific needs.
          </p>

          <div className="mt-8">
            <button
              onClick={scrollToFooter}
              className="mt-6 py-3 px-6 rounded-md border border-[#1671E2] bg-[rgba(40,44,52,0.5)] text-white shadow-md transition hover:bg-gradient-to-r hover:from-[#1671E2] hover:to-[#08E4D2]"
            >
              Request a demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationCustomization;
