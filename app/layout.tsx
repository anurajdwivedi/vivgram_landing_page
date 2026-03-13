import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

const lato = Lato({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vivgram.com"),
  title: "Vivgram | Research Operations & Lifecycle Management Platform",
  description:
    "Manage research facility operations, task scheduling, health tracking, protocol management, and compliance reporting in one connected platform. 50% time saved. 100% audit ready.",
  keywords: [
    "research operations platform",
    "research facility management",
    "protocol management software",
    "research compliance tracking",
    "laboratory task scheduling",
    "facility operations software",
    "IACUC compliance software",
    "research lifecycle management",
  ],
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Vivgram | One Platform. Full Lifecycle. Effortless Management.",
    description:
      "Cloud-based research operations platform for managing tasks, health observations, facility inventory, protocol lifecycles, and regulatory compliance. Built by Team iTek.",
    type: "website",
    url: "https://vivgram.com",
    siteName: "Vivgram",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vivgram | Research Operations Platform",
    description:
      "Manage research facility operations, task scheduling, health tracking, protocol management, and compliance reporting in one connected platform.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://vivgram.com",
  },
  authors: [{ name: "Team iTek", url: "https://vivgram.com" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#082B63" />
      </head>
      <body className={`${lato.variable} font-sans antialiased`} suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Vivgram",
              description:
                "Research Operations & Lifecycle Management Platform for animal research facilities.",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              url: "https://vivgram.com",
              creator: {
                "@type": "Organization",
                name: "Vivgram",
                url: "https://vivgram.com",
              },
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
