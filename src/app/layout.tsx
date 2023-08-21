import "@/styles/globals.css";
import type { Metadata } from "next";
import Header from "./(components)/header/header";
import JotaiProvider from "@/lib/jotai-provider";
import ThemeToggler from "@/lib/theme-toggler";
import { Work_Sans } from "next/font/google";
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
    <JotaiProvider>
      <ThemeToggler>
        <body className={`${workSans.className} bg-gray-50 dark:bg-black`}>
          <Header />
          {children}
        </body>
      </ThemeToggler>
    </JotaiProvider>
  );
}
