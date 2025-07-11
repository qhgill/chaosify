import type { Metadata } from "next";
import { Rubik_Glitch, Rubik } from "next/font/google";
import "./globals.css";

const rubikGlitch = Rubik_Glitch({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  variable: "--font-title",
});

const rubik = Rubik({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "CHAOSIFY",
  description: "image distortion web app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${rubikGlitch.variable} ${rubik.variable} min-h-screen max-w-screen overflow-x-hidden bg-black text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
