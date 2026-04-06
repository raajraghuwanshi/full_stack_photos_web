
import { Geist, Geist_Mono, Inter,Poppins} from "next/font/google";

import "./globals.css";
import QueryProvider from "../components/hoc/QueryPorived";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/ui/Navbar";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Photobooth",
  description: "it is created to share your moments with the world",
  verification: {
    google: "google1d93dd9f67f80839.html"
  },

};
  
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${poppins.variable} antialiased`}
      >
        <QueryProvider>
          <Toaster position="top-right" />
          <Navbar />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
