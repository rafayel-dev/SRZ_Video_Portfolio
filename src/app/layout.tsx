import type { Metadata } from "next";
import { StoreProvider } from "../store/StoreProvider";
import Layout from "../components/layout/Layout";
import "../index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://srzfilms.com"),
  title: "SRZ Films | Cinematic Video Production & Aerial Videography",
  description: "SRZ Films transforms ordinary moments into extraordinary visuals. We specialize in premium cinematic video production, aerial drone videography, and stunning masterpieces.",
  keywords: ["video production", "cinematography", "drone videography", "SRZ Films", "commercial video", "aerial photography", "video editing", "filmmaker"],
  openGraph: {
    title: "SRZ Films | Cinematic Video Production",
    description: "Transforming ordinary moments into extraordinary visuals with premium cinematic video production and aerial drone videography.",
    url: "https://srzfilms.com",
    siteName: "SRZ Films",
    images: [
      {
        url: "/assets/heroBg.jpg",
        width: 1200,
        height: 630,
        alt: "SRZ Films Cinematic Videography",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SRZ Films | Cinematic Video Production",
    description: "Transforming ordinary moments into extraordinary visuals with premium cinematic video production.",
    images: ["/assets/heroBg.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <StoreProvider>
          <Layout>{children}</Layout>
        </StoreProvider>
      </body>
    </html>
  );
}
