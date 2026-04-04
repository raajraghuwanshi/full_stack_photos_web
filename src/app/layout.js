 
  import { Geist, Geist_Mono } from "next/font/google";
  import "./globals.css";
  import QueryProvider  from "../components/hoc/QueryPorived";
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

  export const metadata = {
    title: "Photobooth",
    description: "it is created to share your moments with the world",
    verification: {
      google: "google1d93dd9f67f80839"
  },
 
  };

  export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
           <QueryProvider>
            <Toaster position="top-right" />
            <Navbar/>
            {children}
          </QueryProvider>
        </body>
      </html>
    );
  }
