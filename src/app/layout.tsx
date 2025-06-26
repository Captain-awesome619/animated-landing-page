import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../app/styles/main.scss";
import Header from "./components/Header";
import PageTransition from "./components/pageTransitioning";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Xtrempay",
  description: "Xtrempay - Save Smart. Pay Fast. Earn Big.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <PageTransition>

        <Header />
        {children}
         </PageTransition>
      </body>
    </html>
  );
}
