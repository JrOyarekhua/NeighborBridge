import type { Metadata } from "next";
import { Bebas_Neue, Montserrat, Permanent_Marker } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { cn } from "@/lib/utils";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
});

const marker = Permanent_Marker({
  variable: "--font-marker-src",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "NeighborBridge ATL", template: "%s · NeighborBridge ATL" },
  description:
    "Find food and housing support near you in Atlanta, and discover ways to give back to your community.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={cn("h-full antialiased", montserrat.variable, bebas.variable, marker.variable)}
    >
      {/* Browser extensions (e.g. Grammarly) add attributes to <body>; ignore only those. */}
      <body suppressHydrationWarning className="flex flex-col font-sans">
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
