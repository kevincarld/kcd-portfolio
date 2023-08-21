import "@/styles/globals.css";
import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import Header from "./(components)/header/header";
import JotaiProvider from "@/lib/jotai-provider";
import ThemeToggler from "@/lib/theme-toggler";
const workSans = Work_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kevin Carl David | Fullstack Developer",
  description: "tbd",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${workSans.className}`}>
        <JotaiProvider>
          <ThemeToggler>
            <Header />
            {children}
          </ThemeToggler>
        </JotaiProvider>
      </body>
    </html>
  );
}
