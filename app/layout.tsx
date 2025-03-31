import type { Metadata } from "next";

import "../styles/globals.css";
import "./styles.css";

import { Toaster } from "react-hot-toast";

import ReactQueryProvider from "@/utils/ReactQueryProvider";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Emilist",
  applicationName: "Emilist",
  description: "Discover Your Project Dream Team Here",
  keywords: [
    "Artisans",
    "Artisan",
    "Handymen",
    "Labourers",
    "Experts",
    "Projects",
  ],
  // openGraph: {
  //   images: ["/assets/images/hero-img.png"],
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="app">
        <div className="text-yellow-400 bg-yellow-100 text-green-400 bg-green-100 text-red-400 bg-red-100 text-[#FF5D7A] bg-[#FFF1F2]"></div>
        <ReactQueryProvider>
          <Providers>
            <main>
              <Toaster />
              {children}
            </main>
          </Providers>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
