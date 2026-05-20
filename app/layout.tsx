import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "500", "700", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bridge-xglobal.com"),
  title: {
    default: "BridgeX | Experience the Future of Workspaces",
    template: "%s | BridgeX",
  },
  description:
    "BridgeX seamlessly integrates with your existing systems, creating a truly customized workspace solution.",
  keywords: [
    "BridgeX",
    "workspace",
    "integration",
    "EJAR",
    "property management",
    "smart office",
    "Saudi Arabia",
  ],
  authors: [{ name: "BridgeX Global" }],
  creator: "BridgeX Global",
  publisher: "BridgeX Global",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bridge-xglobal.com",
    siteName: "BridgeX",
    title: "BridgeX | Experience the Future of Workspaces",
    description:
      "BridgeX seamlessly integrates with your existing systems, creating a truly customized workspace solution.",
    images: [
      { url: "/og-image.jpg", width: 1200, height: 630, alt: "BridgeX" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BridgeX | Experience the Future of Workspaces",
    description:
      "BridgeX seamlessly integrates with your existing systems, creating a truly customized workspace solution.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Next.js App Router picks up favicon.ico automatically from /app
  // but we also declare it explicitly here for all formats
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        {/* Explicit fallback link tags — browser always picks these up */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          href="/favicon-32x32.png"
          type="image/png"
          sizes="32x32"
        />
        <link
          rel="icon"
          href="/favicon-16x16.png"
          type="image/png"
          sizes="16x16"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body
        className={`${poppins.className} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
