// Corrected RootLayout component

import "./globals.css"; // Ensure the correct path to your CSS file

import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import { Inter } from "next/font/google"; // Import the font
import AuthProvider from "./context/AuthProvider";

const inter = Inter({ subsets: ["latin"] }); // Initialize the font

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
        <AuthProvider>
      <body className={inter.className}>
          <Navbar />
          {children}
          <Toaster />
      </body>
        </AuthProvider>
    </html>
  );
}
