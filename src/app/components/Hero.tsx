"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";

interface HeroProps {
  scrollToFooter: () => void;
}

const Hero: React.FC<HeroProps> = ({ scrollToFooter }) => {
  const logoRef = useRef<HTMLDivElement>(null);
  const phone1Ref = useRef<HTMLImageElement>(null);
  const phone2Ref = useRef<HTMLImageElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // Animate the logo once
    if (logoRef.current && !hasAnimated.current) {
      gsap.fromTo(
        logoRef.current,
        { y: -50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
        },
      );
    }

    // Single observer for both phone animationss
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;

            if (phone1Ref.current) {
              gsap.to(phone1Ref.current, {
                rotate: 0,
                duration: 1.5,
                ease: "power3.out",
              });
            }
            if (phone2Ref.current) {
              gsap.to(phone2Ref.current, {
                rotate: 0,
                duration: 1.5,
                ease: "power3.out",
              });
            }

            observer.disconnect(); // Disconnect after animation
          }
        });
      },
      { threshold: 0.5, rootMargin: "0px 0px -10% 0px" },
    );

    const targetElement = document.querySelector(".mockup-section");
    if (targetElement) {
      observer.observe(targetElement);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-[#202328] flex flex-col items-center justify-center pb-52 relative">
      {/* Optimized background with CSS */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('./background.png')",
          willChange: "transform",
        }}
      />

      {/* Logo Section */}
      <div
        style={{ borderTop: 0 }}
        ref={logoRef}
        onClick={handleScrollToTop}
        className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 w-auto px-4 py-2 bg-transparent backdrop-blur-lg border border-white border-opacity-5 rounded-b-lg cursor-pointer"
      >
        <Image
          src="/logo.svg"
          alt="Logo"
          width={100}
          height={50}
          priority
          quality={90}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center mt-[120px] sm:mt-[120px] sm:mb-[40px] px-4">
        <h1 className="text-white text-center font-poppins text-3xl sm:text-[48px] md:text-[64px] font-[275] leading-tight md:leading-[96px] tracking-[-0.704px]">
          Experience the Future of <br />
          <span className="bg-gradient-to-r from-[#08E4D2] to-[#1671E2] bg-clip-text text-transparent font-light">
            Workspaces
          </span>
        </h1>
        <button
          onClick={scrollToFooter}
          className="mt-6 py-3 px-6 rounded-md border border-[#1671E2] bg-[rgba(40,44,52,0.5)] text-white shadow-md transition hover:bg-gradient-to-r hover:from-[#1671E2] hover:to-[#08E4D2]"
        >
          Request a demo
        </button>
      </div>

      {/* Unified Mockup Section */}
      <div className="mockup-section relative z-10 mt-12 mb-0 w-full flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0 px-2 md:px-4">
        <Image
          ref={phone1Ref}
          src="/phone1.png"
          alt="Phone Mockup 1"
          width={192}
          height={384}
          className="w-32 sm:w-40 md:w-48 transform rotate-[-10deg] shadow-lg order-1 md:order-1"
          priority
          quality={85}
          style={{ willChange: "transform" }}
        />
        <Image
          src="/dashboard.png"
          alt="Dashboard Mockup"
          width={800}
          height={400}
          className="w-[95%] sm:w-[90%] md:w-full md:max-w-2xl shadow-xl order-3 md:order-2"
          priority
          quality={85}
        />
        <Image
          ref={phone2Ref}
          src="/phone2.png"
          alt="Phone Mockup 2"
          width={192}
          height={384}
          className="w-32 sm:w-40 md:w-48 transform rotate-[10deg] shadow-lg order-2 md:order-3"
          priority
          quality={85}
          style={{ willChange: "transform" }}
        />
      </div>
    </div>
  );
};

export default Hero;
