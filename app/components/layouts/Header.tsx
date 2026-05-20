"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { cn } from "@/app/lib/utils";
import { Button } from "@/app/components/ui/button";
import { ThemeToggle } from "@/app/components/shared/ThemeToggle";
import { useTheme } from "@/app/components/shared/ThemeProvider";
import { NAVIGATION, COMPANY_INFO } from "@/app/lib/constants";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Simple media query hook
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}

// Simple scroll direction hook
function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (
        direction !== scrollDirection &&
        (scrollY - lastScrollY > 5 || scrollY - lastScrollY < -5)
      ) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener("scroll", updateScrollDirection);
    return () => window.removeEventListener("scroll", updateScrollDirection);
  }, [scrollDirection]);

  return scrollDirection;
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const scrollDirection = useScrollDirection();
  const { theme } = useTheme();

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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);

  const logoSrc = !scrolled
    ? "/images/dark-logo.png"
    : isDark
      ? "/images/dark-logo.png"
      : "/images/light-logo.png";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "glass-effect shadow-lg" : "bg-transparent",
        scrollDirection === "down" && scrolled
          ? "-translate-y-full"
          : "translate-y-0",
      )}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="group relative z-50">
            {mounted ? (
              <div className="relative w-32 h-12 transition-transform group-hover:scale-105">
                <Image
                  src={logoSrc}
                  alt={`${COMPANY_INFO.name} Logo`}
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            ) : (
              <div className="w-32 h-12 bg-muted/20 animate-pulse rounded" />
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {NAVIGATION.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors relative group",
                  scrolled
                    ? "text-heading hover:text-primary"
                    : "text-white hover:text-primary",
                )}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </Link>
            ))}
            <ThemeToggle />
            <Button size="sm" asChild>
              <Link href="/contact">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu - Sheet */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button
                  className={cn(
                    "p-2 transition-colors rounded-lg hover:bg-muted/20",
                    scrolled ? "text-heading" : "text-white",
                  )}
                  aria-label="Toggle menu"
                >
                  <Menu size={24} />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader className="text-left mb-8">
                  <SheetTitle className="text-2xl font-display font-bold">
                    {COMPANY_INFO.name}
                  </SheetTitle>
                </SheetHeader>

                {/* Navigation Links */}
                <nav className="flex flex-col space-y-1 mb-8">
                  {NAVIGATION.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="group relative py-3 px-4 text-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-all font-medium"
                    >
                      <span className="relative z-10">{item.label}</span>
                      <div className="absolute inset-0 bg-primary/5 rounded-lg scale-0 group-hover:scale-100 transition-transform" />
                    </Link>
                  ))}
                </nav>

                {/* CTA Button */}
                <div className="pt-6 border-t border-border">
                  <Button className="w-full" size="lg" asChild>
                    <Link href="/contact" onClick={() => setIsOpen(false)}>
                      Get Started
                    </Link>
                  </Button>

                  {/* Footer Info */}
                  <div className="mt-6 pt-6 border-t border-border">
                    <p className="text-sm text-muted-foreground text-center">
                      {COMPANY_INFO.tagline}
                    </p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}

// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { useState, useEffect } from "react";
// import { Menu, X } from "lucide-react";
// import { cn } from "@/app/lib/utils";
// import { ThemeToggle } from "../shared/ThemeToggle";

// // Mock data for demo
// const NAVIGATION = [
//   { href: "/", label: "Home" },
//   { href: "/about", label: "About" },
//   { href: "/services", label: "Services" },
//   { href: "/projects", label: "Projects" },
//   { href: "/team", label: "Team" },
//   { href: "/contact", label: "Contact" },
// ];

// const COMPANY_INFO = {
//   name: "BridgeX",
// };

// // Simple Button component for demo
// const Button = ({ children, size, asChild, className, ...props }: any) => {
//   const Comp = asChild ? "span" : "button";
//   return (
//     <Comp
//       className={cn(
//         "bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors",
//         className,
//       )}
//       {...props}
//     >
//       {children}
//     </Comp>
//   );
// };

// // Simple media query hook
// function useMediaQuery(query: string) {
//   const [matches, setMatches] = useState(false);

//   useEffect(() => {
//     const media = window.matchMedia(query);
//     if (media.matches !== matches) {
//       setMatches(media.matches);
//     }
//     const listener = () => setMatches(media.matches);
//     media.addEventListener("change", listener);
//     return () => media.removeEventListener("change", listener);
//   }, [matches, query]);

//   return matches;
// }

// // Simple scroll direction hook
// function useScrollDirection() {
//   const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");

//   useEffect(() => {
//     let lastScrollY = window.scrollY;

//     const updateScrollDirection = () => {
//       const scrollY = window.scrollY;
//       const direction = scrollY > lastScrollY ? "down" : "up";
//       if (
//         direction !== scrollDirection &&
//         (scrollY - lastScrollY > 5 || scrollY - lastScrollY < -5)
//       ) {
//         setScrollDirection(direction);
//       }
//       lastScrollY = scrollY > 0 ? scrollY : 0;
//     };

//     window.addEventListener("scroll", updateScrollDirection);
//     return () => window.removeEventListener("scroll", updateScrollDirection);
//   }, [scrollDirection]);

//   return scrollDirection;
// }

// export function Header() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const isMobile = useMediaQuery("(max-width: 768px)");
//   const scrollDirection = useScrollDirection();

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Close menu when screen size changes
//   useEffect(() => {
//     if (!isMobile) {
//       setIsOpen(false);
//     }
//   }, [isMobile]);

//   // Prevent body scroll when menu is open
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [isOpen]);

//   return (
//     <>
//       <header
//         className={cn(
//           "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
//           scrolled ? "glass-effect shadow-lg" : "bg-transparent",
//           scrollDirection === "down" && scrolled
//             ? "-translate-y-full"
//             : "translate-y-0",
//         )}
//       >
//         <nav className="container-custom">
//           <div className="flex items-center justify-between h-20">
//             {/* Logo */}
//             <Link href="/" className="group relative z-50">
//               <div className="relative w-12 h-12 transition-transform group-hover:scale-110">
//                 <Image
//                   src="/images/BridgeX-logo.png"
//                   alt="BridgeX Logo"
//                   fill
//                   className="object-contain"
//                   priority
//                 />
//               </div>
//             </Link>

//             {/* Desktop Navigation */}
//             {!isMobile && (
//               <div className="hidden md:flex items-center gap-8">
//                 {NAVIGATION.map((item) => (
//                   <Link
//                     key={item.href}
//                     href={item.href}
//                     className={cn(
//                       "text-sm font-medium transition-colors relative group",
//                       scrolled
//                         ? "text-heading hover:text-primary"
//                         : "text-white hover:text-primary",
//                     )}
//                   >
//                     {item.label}
//                     <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
//                   </Link>
//                 ))}
//                 <ThemeToggle />
//                 <Button size="sm" asChild>
//                   <Link href="/contact">Get Started</Link>
//                 </Button>
//               </div>
//             )}

//             {/* Mobile Menu Button */}
//             {isMobile && (
//               <button
//                 onClick={() => setIsOpen(!isOpen)}
//                 className={cn(
//                   "md:hidden p-2 transition-colors relative z-50",
//                   scrolled
//                     ? "text-heading hover:text-primary"
//                     : "text-white hover:text-primary",
//                 )}
//                 aria-label="Toggle menu"
//               >
//                 {isOpen ? <X size={24} /> : <Menu size={24} />}
//               </button>
//             )}
//           </div>
//         </nav>
//       </header>

//       {/* Mobile Menu Overlay */}
//       {isMobile && isOpen && (
//         <div
//           className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
//           onClick={() => setIsOpen(false)}
//         />
//       )}

//       {/* Mobile Navigation */}
//       {isMobile && (
//         <div
//           className={cn(
//             "fixed top-0 right-0 h-full w-64 bg-secondary/95 backdrop-blur-lg z-40 md:hidden transition-transform duration-300 shadow-2xl",
//             isOpen ? "translate-x-0" : "translate-x-full",
//           )}
//         >
//           <div className="flex flex-col h-full pt-24 px-6 pb-6">
//             <nav className="flex-1 space-y-2">
//               {NAVIGATION.map((item) => (
//                 <Link
//                   key={item.href}
//                   href={item.href}
//                   onClick={() => setIsOpen(false)}
//                   className="block py-3 px-4 text-white hover:text-primary hover:bg-white/5 rounded-lg transition-all"
//                 >
//                   {item.label}
//                 </Link>
//               ))}
//             </nav>
//             <Button className="w-full" size="lg" asChild>
//               <Link href="/contact" onClick={() => setIsOpen(false)}>
//                 Get Started
//               </Link>
//             </Button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
