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
  title: "REDLINE LFC - News Aggregator Engine",
  description: "A high-precision real-time news aggregation and clustering dashboard curating Liverpool FC and European football news.",
  keywords: ["Liverpool FC", "LFC News", "News Aggregator", "Ground News Clone", "RedLine Clone"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${lfcSerif.variable} ${lfcSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
