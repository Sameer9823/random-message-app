// Corrected RootLayout component

import Navbar from "@/components/Navbar";
import { Inter } from "next/font/google"; // Import the font

const inter = Inter({ subsets: ["latin"] }); // Initialize the font

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
        
      <body className={inter.className}>
          <Navbar />
          {children}
         
      </body>
      
    </html>
  );
}
