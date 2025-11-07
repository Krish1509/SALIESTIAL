import type { Metadata } from "next";
import { Orbitron, Poppins, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "react-hot-toast";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SALIESTIAL 2025 — The Technology Era Starts Here",
  description: "Official annual techfest of SAL Institute of Technology. Join us for 3 days of innovation, competition, and celebration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${orbitron.variable} ${poppins.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <Providers>
        {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "rgba(10, 10, 10, 0.9)",
                color: "#ededed",
                border: "1px solid rgba(0, 212, 255, 0.3)",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
