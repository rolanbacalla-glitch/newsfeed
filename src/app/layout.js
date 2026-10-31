import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";

const lfcSerif = Playfair_Display({
  variable: "--font-lfc-serif",
  subsets: ["latin"],
});

const lfcSans = Montserrat({
  variable: "--font-lfc-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "ANFIELD INSIGHTS // Liverpool FC Advanced Tactical Data Engine",
  description: "Elite tactical intelligence, pass networks, and recruitment analytics engineered strictly for Liverpool FC supporters and tactical analysts.",
  keywords: ["Liverpool FC", "LFC Analytics", "Pass Network", "Anfield Insights", "Tactical Data", "OBV", "xG", "Kopites"],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-GB" className={`dark-theme ${lfcSerif.variable} ${lfcSans.variable}`}>
      <body className="bg-[#0D0D10] text-[#FFFFFF] antialiased selection:bg-[#C8102E] selection:text-white">
        {children}
      </body>
    </html>
  );
}
