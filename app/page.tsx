"use client";
import { useRef } from "react";
import Hero from "./components/sections/Hero";
import IntegrationSection from "./components/sections/IntegrationSection";
import IntegrationCustomization from "./components/sections/IntegrationCustomization";
import ConnectedDevices from "./components/sections/ConnectedDevices";
import Footer from "./components/sections/Footer";

export default function Home() {
  const footerRef = useRef<HTMLDivElement>(null);

  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-[var(--background)] overflow-x-hidden">
      <Hero scrollToFooter={scrollToFooter} />
      <IntegrationSection scrollToFooter={scrollToFooter} />
      <IntegrationCustomization scrollToFooter={scrollToFooter} />
      <ConnectedDevices scrollToFooter={scrollToFooter} />
      <div ref={footerRef}>
        <Footer />
      </div>
    </div>
  );
}
