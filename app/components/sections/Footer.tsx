"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { cn } from "@/app/lib/utils";

const Footer: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      company: formData.get("company"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/cta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        setSubmitStatus("success");
        form.reset();
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } else {
        setSubmitStatus("error");
        setTimeout(() => setSubmitStatus("idle"), 5000);
      }
    } catch {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = cn(
    "w-full py-3 px-4 rounded-md",
    "bg-[var(--muted)] text-[var(--foreground)]",
    "border border-[var(--border)]",
    "placeholder:text-[var(--muted-foreground)]",
    "focus:outline-none focus:ring-2 focus:ring-[var(--accent)]",
    "transition disabled:opacity-50 disabled:cursor-not-allowed",
  );

  return (
    <footer className="min-h-screen glass-effect py-8 px-6 md:py-16 md:px-32 text-white relative overflow-hidden">
      {/* Background   */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-3xl pointer-events-none opacity-30"
        style={{ backgroundImage: "url('/footer-bg.png')" }}
      />
      <div className="absolute inset-0 bg-black/50 pointer-events-none" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {/* Left */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-6 md:space-y-8">
          <h2 className="text-center sm:text-left font-poppins font-medium text-[40px] sm:text-[64px] leading-[60px] sm:leading-[96px] tracking-[0.76px] sm:tracking-[1.216px] text-gradient-vertical">
            <div className="flex flex-row lg:flex-col justify-center sm:justify-start">
              <span className="whitespace-nowrap">Let&apos;s</span>
              <span className="ml-2 lg:ml-0 whitespace-nowrap">Explore</span>
            </div>
          </h2>

          <Image
            src="/logo.svg"
            alt="BridgeX Logo"
            width={261}
            height={261}
            className="w-36 sm:w-36 md:w-48 lg:w-[261px]"
            priority
            quality={90}
          />

          <h2 className="text-center sm:text-left font-poppins font-medium text-[40px] sm:text-[64px] leading-[60px] sm:leading-[96px] tracking-[0.76px] sm:tracking-[1.216px] text-gradient-vertical">
            <span>Together</span>
          </h2>
        </div>

        {/* Right */}
        <div className="space-y-6">
          <p className="text-sm md:text-base text-[var(--muted-foreground)]">
            Schedule a personalized demo to discover how BridgeX can
            revolutionize your workspace. Our experts will guide you through the
            platform&apos;s key features and demonstrate how it can address your
            specific needs.
          </p>

          {/* Status Messages */}
          <AnimatePresence>
            {submitStatus === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex items-center gap-3 p-4 rounded-md bg-green-500/20 border border-green-500/50"
              >
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <p className="text-sm text-green-100">
                  Thank you! Your demo request has been sent. We&apos;ll contact
                  you soon.
                </p>
              </motion.div>
            )}

            {submitStatus === "error" && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex items-center gap-3 p-4 rounded-md bg-red-500/20 border border-red-500/50"
              >
                <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <p className="text-sm text-red-100">
                  Oops! Something went wrong. Please try again or contact us
                  directly.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
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
              className={inputClass}
            />
            <input
              type="email"
              name="email"
              placeholder="Work Email"
              required
              disabled={isSubmitting}
              className={inputClass}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              required
              disabled={isSubmitting}
              className={inputClass}
            />
            <input
              type="text"
              name="company"
              placeholder="Company Name"
              required
              disabled={isSubmitting}
              className={inputClass}
            />
            <textarea
              name="message"
              placeholder="Please share anything that will help prepare for our meeting"
              rows={3}
              disabled={isSubmitting}
              className={cn(inputClass, "col-span-1 md:col-span-2 resize-none")}
            />
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              className={cn(
                "col-span-1 md:col-span-2 btn-primary disabled:opacity-50 disabled:cursor-not-allowed",
              )}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin h-5 w-5" />
                  Sending...
                </span>
              ) : (
                "Submit"
              )}
            </motion.button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="relative mt-12 flex flex-col sm:flex-row items-center sm:items-start justify-between text-[var(--muted-foreground)] text-sm md:text-base gap-4">
        <div className="flex items-center space-x-2">
          <Phone className="w-5 h-5 text-[var(--accent)]" />
          <a
            href="tel:+966599704899"
            className="hover:text-[var(--accent)] transition"
          >
            +966 59 9704899
          </a>
        </div>
        <div className="flex items-center space-x-2">
          <Mail className="w-5 h-5 text-[var(--accent)]" />
          <a
            href="mailto:S.Abualia@bridge-xglobal.com"
            className="hover:text-[var(--accent)] transition"
          >
            S.Abualia@bridge-xglobal.com
          </a>
        </div>
      </div>

      <div className="relative w-full mt-8 text-center text-[var(--muted-foreground)] text-xs sm:text-sm">
        All rights reserved for BridgeX Global
      </div>
    </footer>
  );
};

export default React.memo(Footer);
