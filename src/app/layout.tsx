import "@/styles/globals.css";
import type { Metadata } from "next";
import Header from "./(components)/header/header";
import JotaiProvider from "@/lib/jotai-provider";
import ThemeToggler from "@/lib/theme-toggler";
import { Work_Sans } from "next/font/google";
import Footer from "./(components)/footer/footer";
import { ApolloProvider } from "@/lib/apollo-provider";
const workSans = Work_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kevin Carl David | Fullstack Developer",
  description:
    "Hello there! I'm a coder on a mission to create exceptional digital experiences. With a strong foundation in WordPress customization, I've evolved into a frontend specialist, harnessing React, Next.js, and more to bring websites to life.",
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
          <ApolloProvider>
            <Header />
            {children}
            <Footer />
          </ApolloProvider>
        </body>
      </ThemeToggler>
    </JotaiProvider>
  );
}
