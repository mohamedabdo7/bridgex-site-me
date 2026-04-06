"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  scrollToFooter: () => void;
}

const IntegrationSection: React.FC<HeroProps> = ({ scrollToFooter }) => {
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
        { x: "0px", duration: 0.5, ease: "power2.out" }
      );
      tl.fromTo(
        logo2Ref.current,
        { x: "100px" },
        { x: "0px", duration: 0.5, ease: "power2.out" },
        "<"
      );

      // Background images partially separate
      tl.to(
        [mask1Ref.current, mask2Ref.current],
        {
          x: (index) => (index === 0 ? "-200px" : "200px"),
          rotation: (index) => (index === 0 ? -30 : 30),
          duration: 1,
          ease: "power2.out",
        },
        "<"
      );

      // Content starts appearing
      tl.to(
        contentRef.current,
        {
          opacity: 0.5,
          duration: 0.5,
          ease: "power2.out",
        },
        "<"
      );

      // Background images fully separate
      tl.to([mask1Ref.current, mask2Ref.current], {
        x: (index) => (index === 0 ? "-550px" : "550px"),
        rotation: (index) => (index === 0 ? -60 : 60),
        duration: 1,
        ease: "power2.out",
      });

      // Content fully appears
      tl.to(
        contentRef.current,
        {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        "<"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative bg-[#202328] min-h-screen overflow-hidden"
    >
      {/* Left Background Mask */}
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

      {/* Right Background Mask */}
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

      {/* Logos Section */}
      <div className="logos flex items-center justify-center space-x-5 relative z-30 mt-[20vh]">
        <Image
          ref={logo1Ref}
          src="/ejar-logo-1.png"
          alt="Ejar Logo"
          width={128}
          height={128}
          className="w-32"
          priority
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
          priority
          quality={85}
          style={{ willChange: "transform" }}
        />
      </div>

      {/* Content Section */}
      <div
        ref={contentRef}
        className="content relative z-30 text-center mt-12 opacity-0 px-4"
      >
        <h2 className="text-[#EDEDED] text-center font-poppins text-[40px] font-normal leading-[1.5] tracking-[0.76px]">
          <span>Property Management with</span>
          <br />
          <span className="bg-gradient-to-r from-[#08E4D2] to-[#1671E2] bg-clip-text text-transparent">
            EJAR
          </span>{" "}
          Integration
        </h2>

        <p className="text-white text-center font-poppins text-[16px] font-light leading-[1.5] tracking-[-0.176px] mt-4 max-w-lg mx-auto">
          BridgeX seamlessly integrates with your existing systems, creating a
          truly customized workspace solution.
        </p>
        <button
          onClick={scrollToFooter}
          className="mt-6 py-3 px-6 rounded-md border border-[#1671E2] bg-[rgba(40,44,52,0.5)] text-white shadow-md transition hover:bg-gradient-to-r hover:from-[#1671E2] hover:to-[#08E4D2]"
        >
          Request a demo
        </button>
      </div>
    </div>
  );
};

export default IntegrationSection;
