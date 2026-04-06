"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaPhoneAlt } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";

const Footer: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const form = e.currentTarget; // Store form reference before async operations

    const formData = new FormData(form);
    const data = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      company: formData.get("company"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      if (response.status === 200) {
        console.log("Setting success status");
        setSubmitStatus("success");
        form.reset(); // Use stored form reference
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } else {
        console.log("Setting error status");
        setSubmitStatus("error");
        setTimeout(() => setSubmitStatus("idle"), 5000);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="min-h-screen bg-[rgba(40,44,52,0.8)] backdrop-blur-[42px] py-8 px-6 md:py-16 md:px-32 text-white relative">
      {/* Background Blur Image - Optimized */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-3xl pointer-events-none"
        style={{
          backgroundImage: "url('/footer-bg.png')",
          transform: "translateZ(0)", // Force GPU acceleration
        }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-50 pointer-events-none"></div>

      {/* Footer Content */}
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {/* Left Section */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-6 md:space-y-8">
          <h1 className="text-center sm:text-left font-poppins font-medium text-[40px] sm:text-[64px] leading-[60px] sm:leading-[96px] tracking-[0.76px] sm:tracking-[1.216px] bg-gradient-to-b from-[#1671E2] to-[#08E4D2] text-transparent bg-clip-text">
            <div className="flex flex-row lg:flex-col justify-center sm:justify-start">
              <span className="whitespace-nowrap">Let&apos;s</span>
              <span className="ml-2 lg:ml-0 whitespace-nowrap">Explore</span>
            </div>
          </h1>
          <Image
            src="/logo.svg"
            alt="BridgeX Logo"
            width={261}
            height={261}
            className="w-36 sm:w-36 md:w-48 lg:w-[261px]"
            priority
            quality={90}
          />
          <h1 className="text-center sm:text-left font-poppins font-medium text-[40px] sm:text-[64px] leading-[60px] sm:leading-[96px] tracking-[0.76px] sm:tracking-[1.216px] bg-gradient-to-b from-[#1671E2] to-[#08E4D2] text-transparent bg-clip-text">
            <span>Together</span>
          </h1>
        </div>

        {/* Right Section */}
        <div className="space-y-6">
          <p className="text-sm md:text-base text-gray-300">
            Schedule a personalized demo to discover how BridgeX can
            revolutionize your workspace. Our experts will guide you through the
            platform&apos;s key features and demonstrate how it can address your
            specific needs.
          </p>

          {/* Success/Error Messages */}
          {submitStatus === "success" && (
            <div className="flex items-center gap-3 p-4 rounded-md bg-green-500/20 border border-green-500/50 animate-in fade-in slide-in-from-top-2 duration-300">
              <FiCheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
              <p className="text-sm text-green-100">
                Thank you! Your demo request has been sent successfully.
                We&apos;ll contact you soon.
              </p>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="flex items-center gap-3 p-4 rounded-md bg-red-500/20 border border-red-500/50 animate-in fade-in slide-in-from-top-2 duration-300">
              <FiXCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <p className="text-sm text-red-100">
                Oops! Something went wrong. Please try again or contact us
                directly.
              </p>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
          >
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              required
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-md bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#08E4D2] transition disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <input
              type="email"
              name="email"
              placeholder="Work Email"
              required
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-md bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#08E4D2] transition disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              required
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-md bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#08E4D2] transition disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <input
              type="text"
              name="company"
              placeholder="Company Name"
              required
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-md bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#08E4D2] transition disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <textarea
              name="message"
              placeholder="Please share anything that will help prepare for our meeting"
              rows={3}
              disabled={isSubmitting}
              className="w-full col-span-1 md:col-span-2 py-3 px-4 rounded-md bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#08E4D2] resize-none transition disabled:opacity-50 disabled:cursor-not-allowed"
            ></textarea>
            <button
              type="submit"
              disabled={isSubmitting}
              className="col-span-1 md:col-span-2 py-3 px-6 rounded-md border border-[#1671E2] bg-[rgba(40,44,52,0.5)] text-white shadow-md transition hover:bg-gradient-to-r hover:from-[#1671E2] hover:to-[#08E4D2] disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-[#1671E2]/20"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="relative mt-12 flex flex-col sm:flex-row items-center sm:items-start justify-between text-gray-300 text-sm md:text-base gap-4">
        {/* Phone Number */}
        <div className="flex items-center space-x-2">
          <FaPhoneAlt className="w-5 h-5 text-[#08E4D2]" />
          <a
            href="tel:+966599704899"
            className="hover:text-[#08E4D2] transition"
          >
            +966 59 9704899
          </a>
        </div>

        {/* Email */}
        <div className="flex items-center space-x-2">
          <HiOutlineMail className="w-5 h-5 text-[#08E4D2]" />
          <a
            href="mailto:a.abdelraouf@bridge-xglobal.com"
            className="hover:text-[#08E4D2] transition"
          >
            samer.abualia@bridge-xglobal.com
          </a>
        </div>
      </div>

      <div className="relative w-full mt-8 text-center text-gray-400 text-xs sm:text-sm px-4 rounded-md">
        All rights reserved for BridgeX Global
      </div>
    </footer>
  );
};

export default React.memo(Footer);
