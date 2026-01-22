import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://arecnime.vercel.app"),
  title: {
    default:"Arecnime - Anime Discovery and Recommendation Site",
    template: "%s | Arecnime",
  },
  description:
    "Arecnime is a website for finding lastest,trending and top anime ,find anime straming links.",
  keywords: [
    "Anime",
    "Manga",
    "Japanese",
    "Japanese animation",
    "Japanese culture"
  ],
  authors: [{ name: "Adedeji Adebayo", url: "https://x.com/theebayo" }],
  creator: "Adedeji Adebayo",
  publisher: "Adedeji Adebayo",

  openGraph: {
    title: "Arecnime - Anime Discovery and Recommendation Site",
    description:
      "Arecnime is a website for finding lastest,trending and top anime ,find anime straming links.",
    url: "https://arecnime.vercel.app", // Replace with your actual Vercel URL
    siteName: "Arecnime",
    type: "website",
    images: [
      { url: "/og-image.jpg", width: 1200, height: 630, alt: "Arecnime - Anime Recommendation Site" }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arecnime - Anime Discovery and Recommendation Site",
    description: "Arecnime is a website for finding lastest,trending and top anime ,find anime straming links.",
    site: "@theebayo",
    creator: "@theebayo",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header/>
        {children}
      </body>
    </html>
  );
}
