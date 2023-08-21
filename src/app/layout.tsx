import "@/styles/globals.css";
import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import Header from "./(components)/header/header";

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
      <body className={workSans.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
