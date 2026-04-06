"use client";
import { useRef } from "react";
import ConnectedDevices from "./components/ConnectedDevices";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import IntegrationCustomization from "./components/IntegrationCustomization";
import IntegrationSection from "./components/IntegrationSection";

export default function Home() {
  const footerRef = useRef<HTMLDivElement>(null);

  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <Hero scrollToFooter={scrollToFooter} />

      {/* Integration Section */}
      <IntegrationSection scrollToFooter={scrollToFooter} />

      {/* Integration Customization Section */}
      <IntegrationCustomization scrollToFooter={scrollToFooter} />

      {/* Connected Devices Section */}
      <ConnectedDevices scrollToFooter={scrollToFooter} />

      {/* Footer Section */}
      <div ref={footerRef}>
        <Footer />
      </div>
    </div>
  );
}
