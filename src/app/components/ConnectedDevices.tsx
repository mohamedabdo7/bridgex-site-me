"use client";
import React, { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  scrollToFooter: () => void;
}

const ConnectedDevices: React.FC<HeroProps> = ({ scrollToFooter }) => {
  const textRefs = useRef<HTMLSpanElement[]>([]);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const images = useMemo(
    () => [
      "/lamp-stage-1.png",
      "/lamp-stage-2.png",
      "/lamp-stage-3.png",
      "/lamp-stage-4.png",
    ],
    []
  );

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".connected-devices",
        start: "top top",
        end: "bottom+=500 top",
        scrub: 1, // Smoother scrubbing
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    const steps = [
      { opacity: 0.2, duration: 0.5, imageIndex: 0 },
      { opacity: 0.4, duration: 0.5, imageIndex: 1 },
      { opacity: 0.6, duration: 0.5, imageIndex: 2 },
      { opacity: 0.8, duration: 0.5, imageIndex: 3 },
    ];

    // Animate text colors
    textRefs.current.forEach((ref, index) => {
      if (ref) {
        timeline.to(
          ref,
          {
            color: "#1671E2",
            duration: 0.5,
            ease: "power2.out",
          },
          index * 0.5
        );
      }
    });

    // Animate paragraph, button, and background together
    steps.forEach((step, stepIndex) => {
      timeline.to(
        [paragraphRef.current, buttonRef.current, bgRef.current],
        {
          opacity: step.opacity,
          duration: step.duration,
          ease: "power2.out",
        },
        stepIndex * 0.5
      );

      // Update image index
      timeline.call(
        () => {
          setCurrentImageIndex(step.imageIndex);
        },
        [],
        stepIndex * 0.5
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === ".connected-devices") {
          trigger.kill();
        }
      });
    };
  }, [images]);

  const setRef = (el: HTMLSpanElement | null) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  return (
    <div className="connected-devices min-h-screen bg-[#202328] text-white flex flex-col md:flex-row items-center justify-between overflow-hidden">
      {/* Right Section */}
      <div className="order-1 w-full md:order-2 flex-1 relative p-6 sm:p-10 md:p-20">
        {/* Background Image - Optimized */}
        <div
          ref={bgRef}
          className="absolute inset-0 bg-cover bg-center rounded-xl opacity-[0.05]"
          style={{
            backgroundImage: "url('/SectionBG.png')",
            filter: "blur(10px)",
            height: "80%",
            width: "80%",
            top: "10%",
            left: "10%",
            zIndex: -1,
            willChange: "opacity",
          }}
        />

        {/* Content Overlay */}
        <div className="relative z-10 flex items-center justify-center">
          <Image
            ref={imageRef}
            src={images[currentImageIndex]}
            alt="Lamp Stage"
            width={258}
            height={258}
            className="transition-opacity duration-300 ease-in-out"
            priority
            quality={85}
          />
        </div>
      </div>

      {/* Left Section */}
      <div className="order-2 md:order-1 flex-1 flex flex-col items-center justify-center space-y-6 p-6 sm:p-10 md:p-20 text-center md:text-left">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold leading-tight">
          <span
            className="text-gray-400"
            ref={setRef}
            style={{ color: "#9CA3AF", willChange: "color" }}
          >
            Experience
          </span>{" "}
          <span
            className="text-gray-400"
            ref={setRef}
            style={{ color: "#9CA3AF", willChange: "color" }}
          >
            the power
          </span>{" "}
          <span
            className="text-gray-400"
            ref={setRef}
            style={{ color: "#9CA3AF", willChange: "color" }}
          >
            of connected
          </span>{" "}
          <span
            className="text-gray-400"
            ref={setRef}
            style={{ color: "#9CA3AF", willChange: "color" }}
          >
            devices.
          </span>
        </h1>
        <p
          className="text-sm sm:text-base text-gray-400 opacity-[0.2]"
          ref={paragraphRef}
          style={{ willChange: "opacity" }}
        >
          BridgeX seamlessly integrates with a wide range of hardware, including
          digital keys, climate control systems, and advanced security features.
        </p>
        <button
          onClick={scrollToFooter}
          className="mt-6 py-3 px-6 rounded-md border border-[#1671E2] bg-[rgba(40,44,52,0.5)] text-white shadow-md transition hover:bg-gradient-to-r hover:from-[#1671E2] hover:to-[#08E4D2] opacity-[0.2]"
          ref={buttonRef}
          style={{ willChange: "opacity" }}
        >
          Request a demo
        </button>
      </div>
    </div>
  );
};

export default ConnectedDevices;
