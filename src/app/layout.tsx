import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// @ts-ignore
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { BackgroundSquares } from "@/components/bg-squares";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bella | Personal English Phrase Collection",
  description:
    "My personal space for learning and storing English phrases. Collecting words, phrases, and meaning — one sentence at a time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Header />
          <BackgroundSquares />
          <Toaster position="bottom-center" toastOptions={{ duration: 3000 }} />

          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
