"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { COMPANY_INFO, NAVIGATION, SERVICES_LIST } from "@/app/lib/constants";
import { useTheme } from "@/app/components/shared/ThemeProvider";
import { useEffect, useState } from "react";

export function Footer() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (theme === "dark") {
      setIsDark(true);
    } else if (theme === "light") {
      setIsDark(false);
    } else if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      setIsDark(mediaQuery.matches);

      const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    }
  }, [theme, mounted]);

  const logoSrc = isDark ? "/images/light-logo.png" : "/images/dark-logo.png";

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              {mounted ? (
                <div className="relative w-32 h-12">
                  <Image
                    src={logoSrc}
                    alt="BridgeX Logo"
                    fill
                    className="object-contain object-left"
                  />
                </div>
              ) : (
                <div className="w-32 h-12 bg-secondary-foreground/10 animate-pulse rounded" />
              )}
            </div>
            <p className="text-sm text-secondary-foreground/80 mb-4">
              {COMPANY_INFO.tagline}
            </p>
            <p className="text-sm text-secondary-foreground/60">
              {COMPANY_INFO.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-primary">Quick Links</h3>
            <ul className="space-y-2">
              {NAVIGATION.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-primary">Services</h3>
            <ul className="space-y-2">
              {SERVICES_LIST.slice(0, 6).map((service) => (
                <li key={service}>
                  <span className="text-sm text-secondary-foreground/80">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-primary">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  {COMPANY_INFO.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                <div className="flex flex-col gap-1">
                  <a
                    href={`tel:${COMPANY_INFO.phone}`}
                    className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors"
                  >
                    {COMPANY_INFO.phone}
                  </a>
                  <a
                    href={`tel:${COMPANY_INFO.phone2}`}
                    className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors"
                  >
                    {COMPANY_INFO.phone2}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                <span className="text-sm text-secondary-foreground/80">
                  {COMPANY_INFO.location}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-secondary-foreground/60 text-center sm:text-left">
              © {new Date().getFullYear()} {COMPANY_INFO.name}. All rights
              reserved.
            </p>
            <p className="text-sm text-secondary-foreground/60">
              Built with precision in Saudi Arabia
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
