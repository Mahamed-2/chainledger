import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// Leaflet CSS needs to be imported globally to work correctly with React Leaflet
import "leaflet/dist/leaflet.css";
import RoleSwitcher from "@/components/RoleSwitcher";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Digital Product Passport Demo",
  description: "EU ESPR / Chainledger compliant Digital Product Passport (DPP) demonstration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gray-50 flex flex-col`}>
        <RoleSwitcher />
        <div className="flex-1 flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
