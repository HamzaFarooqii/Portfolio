import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hamza Farooqi — AI/ML Developer & CS Student",
  description:
    "Portfolio of Hamza Farooqi, a CS student and AI/ML developer building cool things — from async standup agents to genetic algorithm route optimizers. Warning: may cause inspiration.",
  keywords: ["Hamza Farooqi", "AI Developer", "ML Engineer", "CS Student", "Portfolio", "Next.js", "Python", "React"],
  authors: [{ name: "Hamza Farooqi" }],
  openGraph: {
    title: "Hamza Farooqi — AI/ML Developer",
    description: "CS student building AI-powered tools, route optimizers, and cafes that run themselves.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
