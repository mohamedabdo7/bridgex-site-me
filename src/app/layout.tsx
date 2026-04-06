import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BridgeX - Experience the Future of Workspaces",
  description:
    "BridgeX seamlessly integrates with your existing systems, creating a truly customized workspace solution.",
  keywords: "BridgeX, workspace, integration, EJAR, property management",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "BridgeX",
    description: "Experience the Future of Workspaces",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body className={poppins.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
