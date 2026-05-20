"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import Image from "next/image";
import { cn } from "@/app/lib/utils";

interface HeroProps {
  scrollToFooter: () => void;
}

const Hero: React.FC<HeroProps> = ({ scrollToFooter }) => {
  const phone1Ref = useRef<HTMLImageElement>(null);
  const phone2Ref = useRef<HTMLImageElement>(null);
  const hasAnimated = useRef(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;

            if (phone1Ref.current) {
              gsap.to(phone1Ref.current, {
                rotate: 0,
                opacity: 1,
                duration: 1.5,
                ease: "power3.out",
              });
            }
            if (phone2Ref.current) {
              gsap.to(phone2Ref.current, {
                rotate: 0,
                opacity: 1,
                duration: 1.5,
                ease: "power3.out",
              });
            }

            observer.disconnect();
          }
        });
      },
      { threshold: 0.5, rootMargin: "0px 0px -10% 0px" },
    );

    const target = document.querySelector(".mockup-section");
    if (target) observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center pb-52 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/background.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--background)] pointer-events-none" />

      {/* Navbar Logo */}
      <button
        onClick={handleScrollToTop}
        aria-label="Scroll to top"
        style={{ borderTop: 0 }}
        className="fixed top-0 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-transparent backdrop-blur-lg border border-white/5 rounded-b-lg cursor-pointer transition-opacity duration-700"
        suppressHydrationWarning
      >
        <Image
          src="/logo.svg"
          alt="BridgeX Logo"
          width={100}
          height={50}
          priority
          quality={90}
        />
      </button>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center mt-[120px] sm:mb-[40px] px-4">
        {mounted ? (
          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="text-white text-center font-poppins text-3xl sm:text-[48px] md:text-[64px] font-[275] leading-tight md:leading-[96px] tracking-[-0.704px]"
          >
            Experience the Future of <br />
            <span className="text-gradient font-light">Workspaces</span>
          </motion.h1>
        ) : (
          <h1 className="text-white text-center font-poppins text-3xl sm:text-[48px] md:text-[64px] font-[275] leading-tight md:leading-[96px] tracking-[-0.704px] opacity-0">
            Experience the Future of <br />
            <span className="text-gradient font-light">Workspaces</span>
          </h1>
        )}

        {mounted ? (
          <motion.button
            onClick={scrollToFooter}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className={cn("btn-primary mt-6")}
          >
            Request a demo
          </motion.button>
        ) : (
          <button onClick={scrollToFooter} className={cn("btn-primary mt-6 opacity-0")}>
            Request a demo
          </button>
        )}
      </div>

      {/* Mockup Section */}
      <div className="mockup-section relative z-10 mt-12 w-full flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0 px-2 md:px-4">
        <Image
          ref={phone1Ref}
          src="/phone1.png"
          alt="Phone Mockup 1"
          width={192}
          height={384}
          className="w-32 sm:w-40 md:w-48 shadow-lg order-1 md:order-1"
          priority
          quality={85}
          style={{
            transform: "rotate(-10deg)",
            opacity: 0,
            willChange: "transform, opacity",
          }}
        />

        <div className="order-3 md:order-2 w-[95%] sm:w-[90%] md:w-full md:max-w-2xl">
          <Image
            src="/dashboard.png"
            alt="Dashboard Mockup"
            width={800}
            height={400}
            className="shadow-xl rounded-lg border border-white/5 w-full"
            priority
            quality={85}
          />
        </div>

        <Image
          ref={phone2Ref}
          src="/phone2.png"
          alt="Phone Mockup 2"
          width={192}
          height={384}
          className="w-32 sm:w-40 md:w-48 shadow-lg order-2 md:order-3"
          priority
          quality={85}
          style={{
            transform: "rotate(10deg)",
            opacity: 0,
            willChange: "transform, opacity",
          }}
        />
      </div>
    </div>
  );
};

export default Hero;
